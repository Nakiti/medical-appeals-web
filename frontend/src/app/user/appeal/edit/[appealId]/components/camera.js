import Webcam from "react-webcam"
import { useRef, useState, useEffect, useContext } from "react"
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { FormContext } from "@/app/context/formContext";

const Camera = ({images, setImages}) => {
   const webcamRef = useRef(null)
   const {appealId} = useContext(FormContext)
 
   const handleCapture = () => {
      const imageSrc = webcamRef.current.getScreenshot();

      setImages(prev => [...prev, {id: Date.now(), src: imageSrc}])
      console.log(images)
   };
 
   return (
      <div className="flex flex-col">
      <div 
         className="relative"
         style={{ height: 'calc(100vh - 156px)' }}
      >
         <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            className="absolute w-full h-full object-cover"
            videoConstraints={{ facingMode: 'environment' }}
         />

         {/* Corner overlays */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-11/12 h-full">
               <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white"></div>
               <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white"></div>
               <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white"></div>
               <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white"></div>
            </div>
         </div>
      </div>

      {/* Footer */}
      <div className="bg-black py-4 flex items-center justify-center relative">
         {images.length > 0 && (
            <Link 
            className="absolute left-6 bottom-6 w-12 h-12 bg-white rounded-md overflow-hidden"
            href={`/user/appeal/edit/${appealId}/capture/images`}
            >
               <img
                  src={images[images.length - 1].src}
                  alt="Preview"
                  className="w-full h-full object-cover"
               />
            </Link>
         )}
         <div
            className="flex items-center justify-center w-16 h-16 bg-white rounded-full border-4 border-gray-300 cursor-pointer active:animate-shutter"
            onClick={handleCapture}
         >
            <div className="w-12 h-12 bg-white-500 rounded-full"></div>
         </div>
      </div>
      </div>

   )
}

export default Camera