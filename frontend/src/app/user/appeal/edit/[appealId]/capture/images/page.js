"use client"
import Images from "../../components/images"
import { useContext } from "react"
import { FormContext } from "@/app/context/formContext"

const ImagesPage = () => {
   const {documents, setDocuments} = useContext(FormContext)

   return (
      <Images images={documents} setImages={setDocuments}/>
   )
}

export default ImagesPage