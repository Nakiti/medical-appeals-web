import OpenAI from "openai";
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import busboy from 'busboy';
// import * as tesseract from 'tesseract.js';
import Tesseract from "tesseract.js";
import PDFDocument from "pdfkit"

const openai = new OpenAI({
    apiKey: "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"
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
                     - If a field is not present in the letter, return an empty string ("") as its value.

                     **JSON keys:**
                     - firstName
                     - lastName
                     - dob
                     - insuranceProvider
                     - insuranceAddress
                     - physicianName
                     - physicianAddress
                     - policyNumber
                     - procedureName
                     - denialReason

                     **Input Letter:**
                     """ 
                     ${textString}
                     """

                     **Output:**
                     Return only the valid JSON object and nothing else.
                  `
               }
            ],
         });

         res.json(completion.choices[0].message.content);
         console.log(completion.choices[0].message.content);
      } catch (error) {
         console.error("Error processing file:", error);
         res.status(500).json({ error: "Error processing file" });
      }
   });

   req.pipe(bb);
};

export const writeAppealLetter = async(req, res) => {

   console.log("writing")

   try {
      const completion = await openai.chat.completions.create({
         model: "gpt-4o",
         messages: [
            {
               role: "user",
               content: 
               `
                  You are a professional medical appeals assistant tasked with drafting a formal and persuasive appeal letter in response to a denied insurance claim. Using the information provided below, generate a complete and well-structured appeal letter that is suitable for printing and mailing.

                  ### Patient & Claim Information
                  - Patient Name: ${req.body.firstName} ${req.body.lastName}
                  - Date of Birth: ${req.body.dob}
                  - Claim Number: ${req.body.claimNumber}
                  - Policy Number: ${req.body.policyNumber}
                  - Insurance Provider: ${req.body.insuranceProvider}
                  - Insurance Address: ${req.body.insuranceAddress}
                  - Physician Name: ${req.body.physicianName}
                  - Physician Address: ${req.body.physicianAddress}
                  - Procedure: ${req.body.procedureName}
                  - Denial Reason: ${req.body.denialReason}
                  - Additional Medical or Contextual Details: ${req.body.additionalDetails}

                  ### Appealer Information
                  - Name: ${req.body.appealerFirstName} ${req.body.appealerLastName}
                  - Relation to Patient: ${req.body.appealerRelation}
                  - Address: ${req.body.appealerAddress}
                  - Email: ${req.body.appealerEmailAddress}
                  - Phone: ${req.body.appealerPhoneNumber}

                  ### Formatting Instructions:
                  - Start the letter with today’s date and a formal salutation addressed to the insurance provider.
                  - Clearly state that this is an appeal of the denied procedure.
                  - Include a short summary of the patient’s medical background and medical necessity of the procedure (1–2 paragraphs).
                  - Respectfully refute the denial reason using the information provided, referencing any supporting medical rationale or new details.
                  - End with a polite but firm request for reconsideration, offering to provide further documentation if needed.
                  - Use a formal, professional tone throughout, as if written by the patient or their authorized representative.
                  - The letter should be clear, concise, and printable.

                  ### Output Requirement:
                  Return **only the final letter content**, with no additional commentary or explanation.
               `
            }
         ]
      })

      const letterText = completion.choices[0].message.content

      const doc = new PDFDocument()
      let buffers = []

      doc.on("data", buffers.push.bind(buffers))
      doc.on("end", () => {
         const pdfData = Buffer.concat(buffers)

         res.setHeader("Content-Type", "application/pdf")
         res.setHeader("Content-Disposition", "attatchment; filename=appeal-letter.pdf")
         res.send(pdfData)
      })

      doc.font("Times-Roman").fontSize(12).text(letterText, {
         align: "left",
         lineGap: 6,
      });

      doc.end();
   } catch (err) {
      console.log(err)
   }
}
