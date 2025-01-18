const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
   if (!isOpen) return null;
 
   return (
      <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
         <div className="bg-white rounded-lg shadow-lg w-3/4 sm:w-1/2 md:w-1/3 p-6 relative">
            {/* Close button */}
            <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
            >
            &times;
            </button>
   
            {/* Modal content */}
            <div className="text-center">
            <p className="text-lg mb-4">{message}</p>
   
            <button
               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
               onClick={onConfirm}
            >
               Confirm
            </button>
            </div>
         </div>
      </div>
   );
 };
 
 export default ConfirmModal;
 