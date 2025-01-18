"use client"
import Images from "../../components/images"
import { useContext } from "react"
import { FormContext } from "@/app/context/formContext"

const ImagesPage = () => {
   const {images, setImages} = useContext(FormContext)

   return (
      <Images images={images} setImages={setImages}/>
   )
}

export default ImagesPage