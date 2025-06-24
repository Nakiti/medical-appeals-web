const Research = () => {
  const dummyMessages = [
    { role: "user", text: "Why was my MRI denied?" },
    { role: "assistant", text: "The denial may be due to lack of prior authorization. You can include documentation from your physician explaining medical necessity." },
  ];

  const dummyStrategies = [
    "Request a peer-to-peer review with the insurance medical director.",
    "Submit supporting documentation such as radiology reports or referral letters.",
    "Cite specific plan coverage language related to the procedure.",
  ];

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-6 space-y-6">
      {/* Title */}

      {/* Research Notes */}
      <div>
        <label className="text-sm font-medium text-gray-600">Notes & Research</label>
        <textarea
          className="mt-1 w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500 bg-transparent text-sm text-gray-800 py-2"
          rows={10}
          placeholder="Write your research notes here..."
        />
      </div>

      {/* LLM Chat */}
      <div>
        <label className="text-sm font-medium text-gray-600">Ask AI Assistant</label>
        <div className="mt-2 h-56 overflow-y-auto border border-gray-200 rounded-md p-3 bg-slate-50 space-y-3 text-sm">
          {dummyMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-md max-w-[80%] ${
                msg.role === "user"
                  ? "ml-auto bg-indigo-100 text-right"
                  : "mr-auto bg-white border"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex mt-2 gap-2">
          <input
            type="text"
            className="flex-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-sm py-1"
            placeholder="Type your question..."
          />
          <button className="px-4 py-1.5 text-xs font-medium rounded-full border bg-gradient-to-r from-green-400 to-blue-500 text-white">
            Send
          </button>
        </div>
      </div>      
    </div>
  );
};

export default Research;
