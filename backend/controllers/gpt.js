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
            You are a professional medical appeals assistant tasked with drafting a formal appeal letter.

            ### Patient Info
            - Name: ${inputs.firstName} ${inputs.lastName}
            - DOB: ${inputs.dob}
            - Claim #: ${inputs.claimNumber}
            - Policy #: ${inputs.policyNumber}
            - Insurance: ${inputs.insuranceProvider}
            - Address: ${inputs.insuranceAddress}
            - Physician: ${inputs.physicianName}, ${inputs.physicianAddress}
            - Procedure: ${inputs.procedureName}
            - Denial Reason: ${inputs.denialReason}
            - Details: ${inputs.additionalDetails}

            ### Appealer Info
            - Name: ${inputs.appealerFirstName} ${inputs.appealerLastName}
            - Relation: ${inputs.appealerRelation}
            - Address: ${inputs.appealerAddress}
            - Email: ${inputs.appealerEmailAddress}
            - Phone: ${inputs.appealerPhoneNumber}

            ### Supporting Docs:
            ${documentText}

            ### Instructions:
            - Format this as a professional appeal letter ready to be printed and mailed.
            - Include medical justification, and a request for reconsideration.
            - Output only the final letter content.
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
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment; filename=appeal-letter.pdf");
            res.send(pdfData);
         });

         doc.font("Times-Roman").fontSize(12).text(letterText, {
            align: "left",
            lineGap: 6,
         });
         console.log("pdf sent")
         doc.end();
      } catch (err) {
         console.error("Error generating appeal letter:", err);
         res.status(500).json({ error: "Error generating letter" });
      }
   });

   req.pipe(bb);
};


