import { Bot } from "lucide-react";
import { User } from "lucide-react";

const ChatBubble = ({message, role}) => {
   const isUser = role === 'user';
   return (
      <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
         {!isUser && (
               <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-indigo-600" />
               </div>
         )}
         <div className={`max-w-md p-3 rounded-xl ${isUser ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
               <p className="text-sm">{message}</p>
         </div>
            {isUser && (
               <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-slate-600" />
               </div>
         )}
      </div>
   );
}

export default ChatBubble