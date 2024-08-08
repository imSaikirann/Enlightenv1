import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedQuestion } from '../store/atoms/dataAtoms';

export interface selectedData {
  question: string;
}

export const Create = () => {
  const selectedQ = useRecoilValue(selectedQuestion);
  const setQuestion = useSetRecoilState<selectedData[]>(selectedQuestion);

  const TitleValue = (selectedQ[0] && selectedQ[0].question) || '';
  const [title, setTitle] = useState(TitleValue);
  const [information, setInformation] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(TitleValue);
  }, [TitleValue]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${BACKEND_URL}/topic/publishTopic`,
        {
          title,
          information,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log('Submission successful:', res);

      setTitle('');
      setInformation('');
      setQuestion([]);
      setLoading(false);
    } catch (error) {
      console.error('Error submitting data:', error);
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuestion([]);
  };

  return (
    <div className='bg-white h-[1000px]'>
      <div className="m-1 p-2 mt-[65px] md:mt-[70px] md:m-6 md:px-16">
        <div className="flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-7xl mt-12">
            <div className="mb-4">
              <input
                type="text"
                id="title"
                className="rounded w-full md:text-xl py-2 px-3 text-gray-700 bg-zinc-50 font-create leading-tight focus:outline-none border-none"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-6 h-64">
              <textarea
                id="information"
                className="border-none rounded w-full h-full py-2 px-3 bg-zinc-50 font-create text-gray-700 leading-tight focus:outline-none"
                placeholder="Enter information"
                rows={4}
                value={information}
                onChange={(e) => setInformation(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="flex items-center justify-between space-x-6">
              {selectedQ[0] && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full bg-gray-600 border-slate-800 md:w-[200px] font-buttons text-white font-bold py-2 px-4 rounded-sm focus:outline-none focus:shadow-outline"
                >
                  {loading ? 'Clearing..' : 'Clear title'}
                </button>
              )}

              <button
                type="submit"
                className="w-full bg-black border border-slate-800 md:w-[200px] font-buttons text-white font-bold py-2 px-4 rounded-sm focus:outline-none focus:shadow-outline"
              >
                {loading ? 'Publishing..' : 'Publish'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
