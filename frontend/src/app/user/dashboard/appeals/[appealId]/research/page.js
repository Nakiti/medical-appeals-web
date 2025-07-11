"use client";
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Send, Sparkles, Save, Loader2, Bot, User, BrainCircuit } from 'lucide-react';
import { FormContext } from '@/app/context/formContext';
import { chat, getUsageStats } from '@/app/services/gptServices';
import ChatBubble from '../components/chatBubble';
import { updateAppeal } from '@/app/services/updateServices';

const ResearchPage = () => {
   const [chatHistory, setChatHistory] = useState([
      { role: 'assistant', content: `I'm your AI research assistant. Ask me anything about this appeal, such as "What are the strengths of this case?" or "Find precedents for this denial reason."` }
   ]);
   const [currentMessage, setCurrentMessage] = useState("");
   const [isAiResponding, setIsAiResponding] = useState(false);
   const [isSaving, setIsSaving] = useState(false);
   const [saveStatus, setSaveStatus] = useState(""); // 'Saved' or 'Error'
   const chatEndRef = useRef(null);
   const {inputs, appealId, documents, handleInputsChange, status} = useContext(FormContext)
   const [usage, setUsage] = useState(null)
   const [errorMessage, setErrorMessage] = useState("")
   const [disabled, setDisabled] = useState(false)

   useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [chatHistory]);

   useEffect(() => {
      const fetchData = async() => {
         const response = await getUsageStats()
         setUsage(response.chat)
         if (response.chat.remaining == 0) {
            setDisabled(true)
            setErrorMessage(`You have exceeded your daily limit of parse requests. Resets at ${response.chat.resetsAt && new Date(response.chat.resetsAt).toLocaleString("en-US")}`)
         }
      }

      fetchData()
   }, [])

   const handleSendMessage = async (e) => {
      e.preventDefault();
      if (!currentMessage.trim() || isAiResponding) return;

      const newUserMessage = { role: 'user', content: currentMessage };
      const updatedChatHistory = [...chatHistory, newUserMessage]

      setChatHistory(updatedChatHistory);

      setCurrentMessage("");
      setIsAiResponding(true);

      try {
         const {response, usage} = await chat(updatedChatHistory, inputs);
         const aiMessage = { role: 'assistant', content: response };
         setChatHistory(prev => [...prev, aiMessage]);
         setUsage(usage)
      } catch (error) {
         console.log("error", error)
         const errorMessage = { role: 'assistant', content: `${error.error} Try again at ${new Date(error.usage?.resetsAt).toLocaleString("en-US")}.` };
         setChatHistory(prev => [...prev, errorMessage]);
         setErrorMessage(`${error.error} Try again at ${new Date(error.usage?.resetsAt).toLocaleString("en-US")}.`)
         setDisabled(true)
      } finally {
         setIsAiResponding(false);
      }
   };

   const handleSaveNotes = async () => {
      setIsSaving(true);
      setSaveStatus("");
      try {
         console.log(inputs)
         await updateAppeal(appealId, inputs, documents);
         setSaveStatus("Saved!");
      } catch (error) {
         setSaveStatus("Error saving.");
      } finally {
         setIsSaving(false);
         setTimeout(() => setSaveStatus(""), 2000); // Clear status message after 2s
      }
   };

   return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
         {/* Header */}
         <div>
               <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                  <BrainCircuit className="w-8 h-8 text-indigo-600" />
                  AI Research Assistant
               </h1>
               <p className="mt-1 text-slate-600">
                  Leverage AI to find case precedents, identify strengths, and organize your thoughts.
               </p>
         </div>

         <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Left Side: AI Chat */}
               <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-[75vh]">
                  <div className="p-4 border-b border-slate-200">
                     <h2 className="font-semibold text-slate-800">Chat with your AI Assistant</h2>
                     {usage && (
                        <p className="text-xs text-slate-500 mt-2">
                           Messages Left: <span className="font-semibold text-slate-700">{usage.remaining}</span> / {usage.limit}
                        </p>
                     )}

                     {disabled && (
                        <p className="text-xs mt-1 text-red-600">{errorMessage}</p>
                     )}
                  </div>
                  <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                     {chatHistory.map((msg, index) => (
                        <ChatBubble key={index} role={msg.role} message={msg.content} />
                     ))}
                     {isAiResponding && (
                        <div className="flex items-start gap-3">
                           <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                              <Bot className="w-5 h-5 text-indigo-600" />
                           </div>
                           <div className="p-3 rounded-xl bg-slate-100">
                              <Loader2 className="w-5 h-5 text-slate-500 animate-spin" />
                           </div>
                        </div>
                     )}
                     <div ref={chatEndRef} />
                  </div>
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-white rounded-b-xl">
                     <div className="relative">
                        <input
                           type="text"
                           value={currentMessage}
                           onChange={(e) => setCurrentMessage(e.target.value)}
                           placeholder="Ask a question..."
                           className="w-full pr-12 py-2.5 pl-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                           disabled={isAiResponding || status == "submitted"}
                        />
                        <button 
                           type="submit" 
                           disabled={isAiResponding || !currentMessage.trim() || status == "submitted"} 
                           className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-slate-500 hover:text-indigo-600 disabled:text-slate-300 transition-colors"
                        >
                           <Send size={20} />
                        </button>
                     </div>
                  </form>
               </div>

               {/* Right Side: Notepad */}
               <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-[75vh]">
                  <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                     <h2 className="font-semibold text-slate-800">My Notes</h2>
                     <div className="flex items-center gap-3">
                           {saveStatus && <p className="text-sm text-slate-500">{saveStatus}</p>}
                           <button 
                              onClick={handleSaveNotes} 
                              disabled={isSaving || status == "submitted"} 
                              className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors shadow-sm disabled:opacity-50"
                           >
                              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />}
                              <span>{isSaving ? "Saving..." : "Save"}</span>
                           </button>
                     </div>
                  </div>
                  <div className="flex-grow p-1">
                     <textarea
                        value={inputs.notes}
                        onChange={handleInputsChange}
                        name="notes"
                        placeholder="Start typing your notes here..."
                        className="w-full h-full p-4 resize-none border-0 focus:ring-0 text-slate-700 bg-transparent"
                     />
                  </div>
               </div>
         </div>
      </div>
   );
};

export default ResearchPage;
