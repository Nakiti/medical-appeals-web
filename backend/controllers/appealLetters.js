import { db } from "../db.js";
import { BlobServiceClient, StorageSharedKeyCredential, SASProtocol, generateBlobSASQueryParameters, BlobSASPermissions } from "@azure/storage-blob";
const accountName  = "appeals"
const containerName = "appeals"
const token = "sp=racwdli&st=2025-04-29T06:22:22Z&se=2025-05-07T14:22:22Z&spr=https&sv=2024-11-04&sr=c&sig=HYVN4qLDZi%2FodOHG8Cb9s2n%2BOGKkdI3e2WUjp4U99a4%3D"
const accountKey = "+fHXAcxCf6awMQQnLdlDzPWTFusSCqet/DpjeTgfd24XtCVbSwxghUCMc0G2TRWvp4CrbJSzSG55+ASteAZbjw=="

export const createAppealLetter = (req, res) => {
   const query = "INSERT INTO appeal_letters (`appeal_id`, `file_id`) VALUES(?)"

   const values = [
      req.body.appealId,
      req.body.fileId
   ]
 
   db.query(query, [values], (err, data) => {
      console.log(data)
      if (err) return console.log(err)
      return res.status(200).json(data)
   })
}

export const getAppealLetter = (req, res) => {
   const query = `
      SELECT appeal_letters.*, files.file_name, files.file_type, files.blob_url, files.blob_name
      FROM appeal_letters
      INNER JOIN files ON files.id = appeal_letters.file_id
      WHERE appeal_letters.appeal_id = ?
   `

   const values = [req.params.appealId]

   db.query(query, values, async (err, data) => {
      if (err) return res.json(err)

      console.log(data)
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
            console.log(blobUrl)
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

export const updateAppealLetter = (req, res) => {
   const query = "UPDATE appeal_letters SET `file_id` = ? WHERE `appeal_id` = ?"

   const values = [
      req.params.fileId,
      req.params.appealId
   ]


   db.query(query, values, (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json(data)
   })
}