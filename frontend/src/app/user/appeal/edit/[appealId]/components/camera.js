import Webcam from "react-webcam"
import { useRef, useState, useEffect, useContext } from "react"
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { FormContext } from "@/app/context/formContext";

const Camera = ({images, setImages}) => {
   const webcamRef = useRef(null)
   const [lightingStatus, setLightingStatus] = useState('');
   const [shakyDevice, setShakyDevice] = useState(false);
   const [documentAligned, setDocumentAligned] = useState(false);
   const {appealId} = useContext(FormContext)
 
   const handleCapture = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
         // checkLighting(imageSrc);
         // detectEdges(imageSrc);
      }

      setImages(prev => [...prev, {id: Date.now(), src: imageSrc}])
      console.log(images)
   };
 
   // Check if the lighting is good based on average brightness
   const checkLighting = (imageSrc) => {      
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
         const canvas = document.createElement('canvas');
         const ctx = canvas.getContext('2d');
         ctx.drawImage(img, 0, 0);
         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
         let totalBrightness = 0;
   
         for (let i = 0; i < imageData.data.length; i += 4) {
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            const brightness = (r + g + b) / 3;
            totalBrightness += brightness;
         }
   
         const avgBrightness = totalBrightness / (imageData.data.length / 4);
         setLightingStatus(avgBrightness > 128 ? 'Good lighting' : 'Low lighting');
      };

   };


   // useEffect(() => {
   //    if (window.DeviceMotionEvent) {
   //      window.addEventListener('devicemotion', (event) => {
   //        const { x, y, z } = event.accelerationIncludingGravity;
   //        if (Math.abs(x) > 1 || Math.abs(y) > 1 || Math.abs(z) > 1) {
   //          setShakyDevice(true);
   //        } else {
   //          setShakyDevice(false);
   //        }
   //      });
   //    }
   // }, []);

   return (
      <div className="flex flex-col">
      {/* Webcam and overlays */}
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

         {/* {shakyDevice && (
            <p className="absolute top-24 left-1/2 transform -translate-x-1/2 w-3/4 bg-white text-black text-sm sm:text-base p-2 rounded-full text-center shadow-md">
            Hold the camera steady for better results.
            </p>
         )}
         {!documentAligned && (
            <p className="absolute top-16 left-1/2 transform -translate-x-1/2 w-3/4 bg-white text-black text-sm sm:text-base p-2 rounded-full text-center shadow-sm">
            Document is not aligned properly
            </p>
         )} */}
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