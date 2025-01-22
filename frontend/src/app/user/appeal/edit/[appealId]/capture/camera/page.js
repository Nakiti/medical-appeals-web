"use client"
import Camera from "../../components/camera"
import { useState, useContext } from "react"
import { FormContext } from "@/app/context/formContext"

const CapturePage = () => {
   const {documents, setDocuments} = useContext(FormContext)

   return (
      <Camera images={documents} setImages={setDocuments}/>
   )
}

export default CapturePage