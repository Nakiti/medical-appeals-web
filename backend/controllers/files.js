import { db } from "../db.js";
import { BlobServiceClient, StorageSharedKeyCredential, SASProtocol, generateBlobSASQueryParameters, BlobSASPermissions } from "@azure/storage-blob";
import multer from "multer";
const storage = multer.memoryStorage()
const upload = multer({
   storage: storage,
   limits: { 
      fileSize: 5 * 1024 * 1024,
      fieldSize: 25 * 1024 * 1024
   }, // 5MB limit
});

const accountName  = "appeals"
const containerName = "appeals"
const token = "sp=racwdli&st=2025-01-21T18:58:25Z&se=2025-01-24T02:58:25Z&sv=2022-11-02&sr=c&sig=szzUclNSqwRsyKZC9IPJrfXwZG9ta%2BVvoktn9J4QeN0%3D"
const accountKey = "+fHXAcxCf6awMQQnLdlDzPWTFusSCqet/DpjeTgfd24XtCVbSwxghUCMc0G2TRWvp4CrbJSzSG55+ASteAZbjw=="

const blobServiceClient = new BlobServiceClient(
   `https://${accountName}.blob.core.windows.net?${token}`
)

export const createFile = (req, res) => {
   upload.single("file")(req, res, async(err) => {
      try {
         console.log(req.file)

         const containerClient = blobServiceClient.getContainerClient(containerName)
         const blobName = `${req.body.appealId}/${req.file.originalname}`
         const blockBlobClient = containerClient.getBlockBlobClient(blobName)

         const uploadBlobResponse = await blockBlobClient.upload(req.file.buffer, req.file.buffer.length)
         console.log(`Blob was uploaded successfully. Request ID: ${uploadBlobResponse.requestId}`);

         const blobUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`

         const query = "INSERT INTO files (`appeal_id`, `file_name`, `file_type`, `blob_url`, `blob_name`, `uploaded_at`) VALUES (?)"

         const values = [
            req.body.appealId,
            req.file.originalname,
            req.file.mimetype,
            blobUrl,
            blobName,
            (new Date()).toISOString().slice(0, 19).replace('T', ' '),
         ]
      
         db.query(query, [values], (err, data) => {
            if (err) return res.json(err)
            return res.status(200).json(data)
         })
      } catch (err) {
         console.log(err)
      }
   })
}

export const createBatchFiles = (req, res) => {
   upload.array('files')(req, res, async (err) => {
      if (err) {
         console.log(err);
         return res.status(500).json({ error: "File upload failed" });
      }

      try {
         const containerClient = blobServiceClient.getContainerClient(containerName);
         const filesData = [];

         for (const file of req.files) {
            const blobName = `${req.body.appealId}/${file.originalname}`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            await blockBlobClient.upload(file.buffer, file.buffer.length);
            console.log(`Blob uploaded successfully: ${blobName}`);

            const blobUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;

            filesData.push([
                  req.body.appealId,
                  file.originalname,
                  file.mimetype,
                  blobUrl,
                  blobName,
                  (new Date()).toISOString().slice(0, 19).replace('T', ' '),
            ]);
         }

         const query = "INSERT INTO files (`appeal_id`, `file_name`, `file_type`, `blob_url`, `blob_name`, `uploaded_at`) VALUES ?";
         db.query(query, [filesData], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json(data);
         });

      } catch (err) {
         console.log(err);
         return res.status(500).json({ error: "An error occurred while uploading files" });
      }
   });
};

export const getFilesByAppeal = (req, res) => {
   const query = "SELECT * FROM files WHERE `appeal_id` = ?"

   const values = [req.params.id]

   db.query(query, values, async (err, data) => {
      if (err) return res.json(err)

      try {
         const files = await Promise.all(data.map(async(file) => {
            const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

            const blobName = file.blob_name
            const blobSAS = generateBlobSASQueryParameters({
               containerName,
               blobName,
               permissions: BlobSASPermissions.parse("r"), // Read permission
               startsOn: new Date(new Date().valueOf() - 3600 * 1000),
               expiresOn: new Date(new Date().valueOf() + 3600 * 1000), // Expires in 1 hour
               protocol: SASProtocol.Https
            }, sharedKeyCredential).toString();

            const blobUrl = `${file.blob_url}?${blobSAS}`

            return {
               ...file,
               blob_url: blobUrl
            };
         }))

         return res.status(200).json(files);
      } catch (err) {
         console.log(err)
      }
   })
}

async function streamToBuffer(readableStream) {
   const chunks = [];
   for await (const chunk of readableStream) {
       chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk));
   }
   return Buffer.concat(chunks);
}