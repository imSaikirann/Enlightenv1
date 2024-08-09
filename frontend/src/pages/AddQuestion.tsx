import React, { useState } from 'react';
import axios from 'axios';

export const AskQuestion = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLaoding] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLaoding(true);
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem('token');
      const res = await axios.post(`${BACKEND_URL}/questions/askQuestion`, {
        question,
      }, {
        headers: {
          'Authorization': token,
        },
      });
      console.log('Submission successful:', res);

      setQuestion('');
      setLaoding(false);
    } catch (error) {
      console.error('Error submitting data:', error);
      setLaoding(false);
    }
  };

  return (
    <div className='bg-white h-[1000px]'>
      <div className="m-1 p-2 flex  mt-[65px] md:mt-[70px] md:m-6 md:px-16 md:flex md:flex-col md:justify-center md:items-center">
        <div className="flex flex-col items-center  justify-center  ">
          <form onSubmit={handleSubmit} className="w-full max-w-7xl mt-12">
            <div className="mb-4">

              <input
                type="text"
                id="title"
                className="rounded w-full text-sm  py-4 px-3  text-gray-900 bg-zinc-100 font-create leading-tight focus:outline-none border-none md:text-md"
                placeholder="Type your question here"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />

            </div>

            <div className="flex items-center justify-between ">
              <button
                type="submit"
                className="w-full font-create text-md bg-black border font-normal border-slate-800 md:w-full md:text-lg  text-white py-2 px-4 rounded-sm focus:outline-none focus:shadow-outline"
              >
          {loading ? "Processing..." : "Submit Question"}
              </button>
            </div>
          </form>
          <div className="mt-6 px-4 md:px-8">
  <h3 className="font-bold text-lg mb-4 font-create">Rules for Asking Questions:</h3>
  <ul className="list-disc list-inside font-create text-sm text-gray-700 space-y-2">
    <li className="break-words">Start the question with "Where", "How", "What", "Why", "When", or "Who".</li>
    <li className="break-words">Include a question mark at the end.</li>
    <li className="break-words">Use clear and proper language; avoid slang or non-standard abbreviations.</li>
    <li className="break-words">Ensure the question is clear, concise, and a complete sentence.</li>
    <li className="break-words">Avoid repetitive words and unnecessary details.</li>
    <li className="break-words">Do not ask for personal or sensitive information.</li>
  </ul>
</div>


        </div>
      </div>
    </div>
  );
};
