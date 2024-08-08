import React, { useState } from 'react';
import axios from 'axios';

export const AskQuestion = () => {
  const [question, setQuestion] = useState('');
 
  const [loading, setLaoding] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLaoding(true)
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem('token');
      const res = await axios.post(`${BACKEND_URL}/questions/askQuestion`, {
       question
      }, {
        headers: {
          'Authorization': token
        }
      });
      console.log('Submission successful:', res);

      setQuestion('');
   setLaoding(false)
    } catch (error) {
      console.error('Error submitting data:', error);
      setLaoding(false)
    }
  };

  return (
    <div className='bg-white h-[1000px]'>
      <div className="m-1 p-2 mt-[65px] md:mt-[70px] md:m-6 md:px-16">
        <div className="flex items-center justify-center ">
          <form onSubmit={handleSubmit} className="w-full max-w-7xl mt-12">
            <div className="mb-4">

              <input
                type="text"
                id="title"
                className=" rounded w-full md:text-xl py-2 px-3 text-gray-700 bg-zinc-50 font-create leading-tight focus:outline-none border-none"
                placeholder="Enter title"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />

            </div>
         

            <div className="flex items-center justify-between ">
              <button
                type="submit"
                className="w-full bg-black border border-slate-800 md:w-[200px] font-buttons text-white font-bold py-2 px-4 rounded-sm focus:outline-none focus:shadow-outline"
              >
                {loading ? "Publishing.." : "Publish"}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
