import OpenAI from "openai";
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import busboy from 'busboy';
// import * as tesseract from 'tesseract.js';
import Tesseract from "tesseract.js";

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
         // console.log("files", files)

         for (const {buffer, mimetype} of files) {
            // console.log("files", buffer, mimetype)

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
               const base64Image = `data:${mimetype};base64,${buffer.toString('base64')}`;
               const { data: { text } } = await Tesseract.recognize(base64Image);
               extractedTexts.push(text.replace(/(\w)\n(\w)/g, '$1 $2').replace(/\n/g, ' ').trim());
            } else {
               console.log(`Unsupported file type: ${mimetype}`);
            }
         }
         console.log("what")


         // Send extracted text to OpenAI
         console.log(extractedTexts)
         const textString = extractedTexts.join()

         const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
               { role: "user", content: `Give me a summary: ${textString}` }
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
