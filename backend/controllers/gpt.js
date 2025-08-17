import OpenAI from "openai";
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import busboy from 'busboy';
// import * as tesseract from 'tesseract.js';
import Tesseract from "tesseract.js";
import PDFDocument from "pdfkit"
import { usageCache, LIMITS } from "../ratelimiter.js";
import 'dotenv/config'

const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY
});

export const extractData = (req, res) => {
   const bb = busboy({ headers: req.headers });
   let fileBuffer = Buffer.alloc(0);
   const files = []
   
   console.log("yppsdf")
   // console.log(req.body)

   bb.on('file', (fieldname, file, filename) => {
      
      file.on('data', (data) => {
         fileBuffer = Buffer.concat([fileBuffer, data]);
      });

      file.on('end', () => {
         files.push({buffer: fileBuffer, mimetype: filename.mimeType})
         console.log(`File [${fieldname}] finished`);
      });
   });

   bb.on('finish', async () => {
      try {
         const extractedTexts = []
         console.log("files", files)

         for (const {buffer, mimetype} of files) {
            console.log("files", buffer, mimetype)

            if (mimetype == "application/pdf") {
               const pdfUint8Array = new Uint8Array(buffer);
               const loadingTask = pdfjsLib.getDocument(pdfUint8Array);
               const pdfDocument = await loadingTask.promise;
               let extractedText = '';

               for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
                  const page = await pdfDocument.getPage(pageNum);
                  const textContent = await page.getTextContent();

                  textContent.items.forEach(item => {
                     extractedText += item.str + ' ';
                  });
               }

               extractedTexts.push(extractedText);
               console.log("pdf ran")
            } else if (mimetype.startsWith('image/')) {
               console.log("ran hjere")
               console.log(mimetype)
               const base64Image = `data:${mimetype};base64,${buffer.toString('base64')}`;
               const { data: { text } } = await Tesseract.recognize(base64Image);
               extractedTexts.push(text.replace(/(\w)\n(\w)/g, '$1 $2').replace(/\n/g, ' ').trim());
            } else {
               console.log(`Unsupported file type: ${mimetype}`);
            }
         }
         console.log("what")


         // Send extracted text to OpenAI
         // console.log(extractedTexts)
         const textString = extractedTexts.join()
         console.log("the text:", textString)

         const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
               { role: "user", 
                  content: 
                     `
                     You are a JSON extraction assistant.

                     Your task is to extract the following information from the text of an insurance denial letter.

                     **Instructions:**
                     - Output a **single valid JSON object**.
                     - Use the exact keys shown below.
                     - Do **not include any explanation, markdown, or text outside the JSON**.
                     - All keys and string values must be wrapped in double quotes as required by JSON format.
                     - If a field is not present in the letter, return an empty string ("") as its value.
                     - The "denialReason" should include the full sentence or paragraph that explains why the claim was denied. Look for phrases like:
                        "coverage is denied", "not medically necessary", "unable to approve", or "according to our guidelines".

                     **JSON keys:**
                     - "firstName"
                     - "lastName"
                     - "dob"
                     - "insuranceProvider"
                     - "insuranceAddress"
                     - "physicianName"
                     - "physicianAddress"
                     - "policyNumber"
                     - "procedureName"
                     - "denialReason"

                     **Input Letter:**
                     """ 
                     ${textString}
                     """

                     **Output:**
                     Return only the valid JSON object — no code block, no markdown, no explanation. Just pure JSON.
                     `

               }
            ],
         });

         res.json({
            content: completion.choices[0].message.content,
            usage: res.locals.usage
         });
         console.log(completion.choices[0].message.content);
      } catch (error) {
         console.error("Error processing file:", error);
         res.status(500).json({ error: "Error processing file" });
      }
   });

   req.pipe(bb);
};

export const writeAppealLetter = (req, res) => {
   const bb = busboy({ headers: req.headers });
   let fileBuffer = Buffer.alloc(0);
   const files = [];
   let inputs = null;

   bb.on('field', (fieldname, val) => {
      if (fieldname === 'inputs') {
         inputs = JSON.parse(val); // stringified JSON
      }
   });

   bb.on('file', (fieldname, file, info) => {
      const { filename, mimeType } = info;
      let chunks = [];

      file.on('data', (data) => chunks.push(data));

      file.on('end', () => {
         const buffer = Buffer.concat(chunks);
         files.push({ buffer, mimeType, filename });
      });
   });

   bb.on('finish', async () => {
      try {
         let documentText = "";

         for (const { buffer, mimeType } of files) {
         if (mimeType === "application/pdf") {
            const pdfUint8Array = new Uint8Array(buffer);
            const loadingTask = pdfjsLib.getDocument(pdfUint8Array);
            const pdfDocument = await loadingTask.promise;

            for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
               const page = await pdfDocument.getPage(pageNum);
               const textContent = await page.getTextContent();
               documentText += textContent.items.map((i) => i.str).join(" ") + "\n";
            }
         }
         // Optionally support image OCR here like you do in extractData
         }

         console.log(documentText)

         const prompt = `
            You are a professional medical appeals assistant. Your task is to draft a formal and comprehensive appeal letter based on the information provided. The letter should be well-structured, persuasive, and ready to be printed and mailed.

            ### Patient Information
            - Name: ${inputs.firstName} ${inputs.lastName}
            - Date of Birth: ${inputs.dob}
            - Policy Number: ${inputs.policyNumber}
            - Claim Number: ${inputs.claimNumber}
            - Insurance Provider: ${inputs.insuranceProvider}
            - Insurance Provider's Address: ${inputs.insuranceAddress}

            ### Medical Details
            - Treating Physician: ${inputs.physicianName}
            - Physician's Address: ${inputs.physicianAddress}
            - Procedure/Service in Question: ${inputs.procedureName}
            - Date of Service: [If available, insert Date of Service, otherwise omit]
            - Reason for Denial: ${inputs.denialReason}
            - Additional Details regarding the medical necessity: ${inputs.additionalDetails}

            ### Appealer Information
            - Name: ${inputs.appealerFirstName} ${inputs.appealerLastName}
            - Relationship to Patient: ${inputs.appealerRelation}
            - Address: ${inputs.appealerAddress}
            - Email: ${inputs.appealerEmailAddress}
            - Phone Number: ${inputs.appealerPhoneNumber}

            ### Supporting Documentation Text
            ${documentText}

            ### Additional Notes to Consider and Integrate
            ${inputs.notes}

            ### Instructions:

            1.  **Format as a Formal Letter:** The output must be a complete letter.
               * Start with the appealer's full address, followed by the date.
               * Include the insurance provider's name and address.
               * Use a clear and specific subject line that includes the patient's name, policy number, and claim number.
               * Use a formal salutation, such as "To Whom It May Concern," or "Dear [Insurance Provider Name] Appeals Department,".
               * End with a professional closing like "Sincerely," followed by the appealer's typed name, relationship to the patient, and contact information.

            2.  **Adopt a Professional and Persuasive Tone:** The language should be formal, respectful, and confident. Avoid emotional or aggressive language.

            3.  **Structure the Letter's Content:**
               * **Introduction:** In the first paragraph, clearly state that you are appealing a denied claim. Identify the patient's name, policy number, claim number, and the service that was denied.
               * **Background and Medical Justification:**
                  * Provide a brief history of the patient's condition leading up to the procedure.
                  * Explain why the procedure was medically necessary. Use the "Additional Details" and information from the "Supporting Documentation Text" to build a strong case.
                  * Directly address the "Reason for Denial" and counter it with evidence-based arguments. For instance, if the denial was for "not medically necessary," present the physician's rationale and reference the attached medical records.
                  * Clearly mention the treating physician's name and their medical opinion.
               * **Call to Action:** In the penultimate paragraph, formally request a reconsideration of the denial. State that you have enclosed supporting documents and request a thorough review of the new information.
               * **Conclusion:** In the final paragraph, thank them for their time and consideration. Reiterate the appealer's contact information for any follow-up questions.

            4.  **Incorporate Supporting Documents:** Mention that supporting documents are attached (e.g., "Enclosed with this letter, you will find..."). Refer to them in the body of the letter to support your arguments.

            5.  **Produce a Complete and Clean Output:** Generate only the final letter content, with no extra text, explanations, or placeholders unless a piece of information (like the date of denial) was not provided. If a critical piece of information is missing, use a clear placeholder like "[Insert Date of Denial]". Ensure all provided variables are seamlessly integrated into the letter.

            By following these detailed instructions, you will produce a complete, polished, and effective appeal letter. Don't inclue any backticks or additional characters at the beginning/end of the letter
            `
         ;

         const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }]
         });

         const letterText = completion.choices[0].message.content;
         console.log(letterText)

         // Generate PDF
         const doc = new PDFDocument();
         const buffers = [];

         doc.on("data", buffers.push.bind(buffers));
         doc.on("end", () => {
         const pdfData = Buffer.concat(buffers);
            res.json({
               pdf: pdfData.toString("base64"),
               usage: res.locals.usage
            });
         });

         doc.font("Times-Roman").fontSize(12).text(letterText, {
            align: "left",
            lineGap: 6,
         });

         console.log(res.locals.usage)
         console.log("pdf sent")
         doc.end();
      } catch (err) {
         console.error("Error generating appeal letter:", err);
         res.status(500).json({ error: "Error generating letter" });
      }
   });

   req.pipe(bb);
};

export const chat = async (req, res) => {
   try {
      const { messages, appealDetails } = req.body;

      if (!messages || !appealDetails) {
         return res.status(400).json({ error: "Missing chatHistory or appealDetails in request body" });
      }

      console.log(messages, appealDetails.procedureName)
 
      const completion = await openai.chat.completions.create({
         model: "gpt-4o",
         messages: [
            {
               role: 'system',
               content: `You are a helpful AI assistant specializing in medical insurance appeals. The current appeal is for: ${appealDetails.procedureName || ""}. The denial reason is: ${appealDetails.denialReason || ""}. You are to only provide information regarding medical appeals and related issues. Do not respond to other requests`
            },
            ...messages
         ]
      });

      const aiMessage = completion.choices[0].message.content;
      res.json({ 
         response: aiMessage,
         usage: res.locals.usage  
      });
   } catch (err) { 
      console.error("Error in chat:", err);
      res.status(500).json({ error: "Error generating chat response" });
   }
};


export const getUsageStats = (req, res) => {
   const userId = "static-user-id";

   const chatKey = `chat-${userId}`;
   const letterKey = `letter-${userId}`;
   const parseKey = `parse-${userId}`

   const chatUsed = usageCache.get(chatKey) || 0;
   const letterUsed = usageCache.get(letterKey) || 0;
   const parseUsed = usageCache.get(parseKey) || 0

   const usageData = {
      chat: {
         limit: LIMITS.chat,
         used: chatUsed,
         remaining: LIMITS.chat - chatUsed,
         resetsAt: usageCache.get(chatKey) || null
      },
      letter: {
         limit: LIMITS.letter,
         used: letterUsed,
         remaining: LIMITS.letter - letterUsed,
         resetsAt: usageCache.get(letterKey) || null
      },
      parse: {
         limit: LIMITS.parse,
         used: letterUsed,
         remaining: LIMITS.parse - parseUsed,
         resetsAt: usageCache.get(parseKey) || null
      },
   };

  res.json(usageData);
};
