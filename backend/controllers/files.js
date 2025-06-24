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
const token = "sp=racwdli&st=2025-06-19T13:01:12Z&se=2025-07-01T21:01:12Z&spr=https&sv=2024-11-04&sr=c&sig=0UxId%2BrO38rQ67UREoVqHs1iYXtmd4ip4f60ql1UKhU%3D"
const accountKey = "+fHXAcxCf6awMQQnLdlDzPWTFusSCqet/DpjeTgfd24XtCVbSwxghUCMc0G2TRWvp4CrbJSzSG55+ASteAZbjw=="
 
const blobServiceClient = new BlobServiceClient(
   `https://${accountName}.blob.core.windows.net?${token}`
)

export const createFile = (req, res) => {
   upload.single("file")(req, res, async(err) => {
      try {
         const containerClient = blobServiceClient.getContainerClient(containerName)
         const blobName = `${req.body.appealId}/${req.file.originalname}`
         const blockBlobClient = containerClient.getBlockBlobClient(blobName)

         const uploadBlobResponse = await blockBlobClient.uploadData(req.file.buffer, {
            blobHTTPHeaders: {
               blobContentType: req.file.mimetype,
               blobContentDisposition: 'inline' 
            }
         })
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
      
         console.log("blob url: ", blobUrl)
         db.query(query, [values], (err, data) => {
            if (err) return res.json(err)
            return res.status(200).json(data.insertId)
         })
      } catch (err) {
         console.log(err)
      }
   })
}

export const updateFile = (req, res) => {
      upload.single("file")(req, res, async(err) => {
      try {
         const containerClient = blobServiceClient.getContainerClient(containerName)
         const blobName = `${req.body.appealId}/${req.file.originalname}`
         const blockBlobClient = containerClient.getBlockBlobClient(blobName)

         const uploadBlobResponse = await blockBlobClient.uploadData(req.file.buffer, {
            blobHTTPHeaders: {
               blobContentType: req.file.mimetype,
               blobContentDisposition: 'inline' 
            }
         })
         console.log(`Blob was uploaded successfully. Request ID: ${uploadBlobResponse.requestId}`);

         const blobUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`

         const query = "UPDATE files SET `blob_url` = ?, `uploaded_at` = NOW() WHERE `id` = ?";

         const values = [
            blobUrl,
            req.params.fileId
         ]
      
         console.log("blob url: ", blobUrl)
         db.query(query, values, (err, data) => {
            if (err) return console.log(err)
            console.log(data)
            return res.status(200).json(data.insertId)
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
         return console.log({ error: "File upload failed" });
      }

      try {
         const containerClient = blobServiceClient.getContainerClient(containerName);
         const filesData = [];
 
         console.log("THESE THE FILES", req.files)

         for (const file of req.files) {
            console.log(file)
            const blobName = `${req.body.appealId}/${file.originalname}`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            await blockBlobClient.upload(file.buffer, file.buffer.length, {
               blobHTTPHeaders: {
                  blobContentType: file.mimetype, // this tells Azure how to render it
                  blobContentDisposition: 'inline' // this forces in-browser viewing
               }
            });
            console.log(`Blob uploaded successfully: ${blobName}`);

            const blobUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
            // console.log("url", blobUrl)
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
            const insertedId = data.insertId;
            const rowCount = data.affectedRows;

            const selectQuery = `
               SELECT * FROM files 
               WHERE id >= ? AND id < ?
            `;

            db.query(selectQuery, [insertedId, insertedId + rowCount], (err, rows) => {
               if (err) return res.status(500).json(err);
               return res.status(200).json(rows);
            });
         });

      } catch (err) {
         console.log(err);
         return res.status(500).json({ error: "An error occurred while uploading files" });
      }
   });
};

export const getFilesByAppeal = (req, res) => {
   const query = `
      SELECT * 
      FROM files 
      WHERE appeal_id = ? 
        AND id NOT IN (SELECT file_id FROM appeal_letters)
   `;
   const values = [req.params.id]

   // console.log(values)

   db.query(query, values, async (err, data) => {
      if (err) return res.json(err)

      // console.log(data)
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

            const blobUrl = `${file.blob_url}?${blobSAS}&response-content-disposition=inline&response-content-type=application/pdf`
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

export const uploadAppealLetterFile = async(req, res) => {
   
}


export const deleteFiles = async (req, res) => {
   const { fileIds } = req.body; // expects either a single ID or an array of IDs

   const ids = Array.isArray(fileIds) ? fileIds : [fileIds];

   if (!ids.length) {
      return res.status(400).json({ message: "No file IDs provided." });
   }

   try {
      // Optional: Delete blobs from Azure
      const getBlobsQuery = "SELECT blob_url FROM files WHERE id IN (?)";
      db.query(getBlobsQuery, [ids], async (err, data) => {
         if (err) return res.status(500).json(err);

         for (const file of data) {
            const blobPath = new URL(file.blob_url).pathname.replace(/^\/+/, "");
            const blobName = blobPath.substring(blobPath.indexOf("/") + 1);
            const blockBlobClient = blobServiceClient.getContainerClient(containerName).getBlockBlobClient(blobName);
            await blockBlobClient.deleteIfExists();
         }

         // Delete from MySQL
         const deleteQuery = "DELETE FROM files WHERE id IN (?)";
         console.log(ids)
         db.query(deleteQuery, [ids], (err, result) => {
            console.log(err)
            if (err) return res.status(500).json(err);
            return res.status(200).json({ message: "Files deleted successfully.", deleted: ids });
         });
      });
   } catch (err) {
      console.error("Delete error:", err);
      res.status(500).json({ message: "Error deleting files." });
   }
}