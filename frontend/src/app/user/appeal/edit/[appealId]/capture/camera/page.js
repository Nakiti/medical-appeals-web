"use client"
import Camera from "../../components/camera"
import { useState, useContext } from "react"
import { FormContext } from "@/app/context/formContext"

const CapturePage = () => {
   const {images, setImages} = useContext(FormContext)

   return (
      <Camera images={images} setImages={setImages}/>
   )
}

export default CapturePage