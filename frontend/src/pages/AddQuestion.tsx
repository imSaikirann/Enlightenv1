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



          <div className="flex p-4 mt-6 text-sm text-black opacity-90 rounded-lg bg-blue-50" role="alert">
  <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span className="sr-only">Info</span>
  <div>
    <span className="font-medium opacity-100">Rules for Asking Questions:</span>
      <ul className="mt-1.5 list-disc">
        <li>Start the question with "Where", "How", "What", "Why", "When", or "Who".</li>
        <li>Include a question mark at the end.</li>
        <li>Use clear and proper language; avoid slang or non-standard abbreviations</li>
        <li>Ensure the question is clear, concise, and a complete sentence.</li>
        <li>Avoid repetitive words and unnecessary details.</li>
        <li>Do not ask for personal or sensitive information.</li>
    </ul>
  </div>
</div>



        </div>
      </div>
    </div>
  );
};
