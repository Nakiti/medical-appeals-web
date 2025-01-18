import OpenAI from "openai";
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import busboy from 'busboy';

const openai = new OpenAI({
    apiKey: "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"
});

export const extractData = (req, res) => {
   const bb = busboy({ headers: req.headers });
   let fileBuffer = Buffer.alloc(0);

   bb.on('file', (fieldname, file, filename, encoding, mimetype) => {
      console.log(`Receiving file: ${filename}`);
      
      file.on('data', (data) => {
         fileBuffer = Buffer.concat([fileBuffer, data]);
      });

      file.on('end', () => {
         console.log(`File [${fieldname}] finished`);
      });
   });

   bb.on('finish', async () => {
      try {
         const pdfUint8Array = new Uint8Array(fileBuffer);

         // Load the PDF document
         console.log("buff", pdfUint8Array)
         const loadingTask = pdfjsLib.getDocument(pdfUint8Array);
         const pdfDocument = await loadingTask.promise;

         let extractedText = '';

         // Loop through each page and extract text
         for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
            const page = await pdfDocument.getPage(pageNum);
            const textContent = await page.getTextContent();

            // Concatenate text from the page
            textContent.items.forEach(item => {
               extractedText += item.str + ' ';
            });
            console.log(extractedText)
         }

         // Send extracted text to OpenAI
         const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
               { role: "user", content: `Extract the person's name from this text: ${extractedText}` }
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
