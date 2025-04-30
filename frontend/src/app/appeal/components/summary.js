
const SummaryItem = ({title, fields, inputs}) => {

   return (
      <div key={title} className="mb-6">
         <h3 className="text-lg sm:text-xl font-semibold border-b pb-2 mb-4">{title}</h3>
         <ul className="space-y-2">
            {fields.map((field) => (
               <li key={field} className="flex justify-between border-b pb-2 text-sm sm:text-base">
                  <span className="font-medium">
                     {field
                        .replace(/([A-Z])/g, " $1") // add space before capital letters
                        .split(" ")                 // split into words
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize
                        .join(" ")}:
                  </span>
                  <span>{inputs[field] || "N/A"}</span>
               </li>
            ))}
         </ul>
      </div>
   )
}

export default SummaryItem