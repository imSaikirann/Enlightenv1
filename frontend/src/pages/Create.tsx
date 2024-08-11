import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedQuestion } from '../store/atoms/dataAtoms';
import Alerts from '../components/Alert';

export interface Question {
  id: string;
  question: string;
}

export interface selectedData {
  id: string;
  question: Question; 
}

export const Create = () => {
  const selectedQ = useRecoilValue<selectedData[]>(selectedQuestion);
  const setQuestion = useSetRecoilState<selectedData[]>(selectedQuestion);

  const TitleValue = (selectedQ[0] && selectedQ[0].question.question) || '';
  const [title, setTitle] = useState(TitleValue);
  const [information, setInformation] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
          questionId: selectedQ[0].question.id,
          title,
          information,
          authorId: "",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log('Submission successful:', res);
      setSuccess(true);

      setTitle('');
      setInformation('');
      setQuestion([]);
      setLoading(false);
    } catch (error) {
      console.error('Error submitting data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="m-4 p-2 md:mt-[70px] md:m-8 md:px-12">
        <div className="flex items-center  mt-12  justify-center">
          {success ? (
            <Alerts message={"Submitted successfully"} />
          ) : (
            <div className="flex flex-col mt-10 w-full max-w-2xl">
              <form onSubmit={handleSubmit} className="w-full mt-12">
                <div className="mb-4">
                  <input
                    type="text"
                    id="title"
                    className="rounded w-full md:text-lg py-2 px-3 text-gray-700 bg-zinc-50 font-create leading-tight focus:outline-none border-none"
                    placeholder="Enter title"
                    value={title}
                    readOnly
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <textarea
                    id="information"
                    className="border-none rounded w-full h-64 py-2 px-3 bg-zinc-50 font-create text-gray-700 leading-tight focus:outline-none"
                    placeholder="Enter information"
                    rows={6}
                    value={information}
                    onChange={(e) => setInformation(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="flex items-center justify-between space-x-4">
                  <button
                    type="submit"
                    className="w-full bg-black border border-slate-800 md:w-48 font-buttons text-white font-bold py-2 px-4 rounded-sm focus:outline-none focus:shadow-outline"
                  >
                    {loading ? 'Publishing...' : 'Publish'}
                  </button>
                </div>
              </form>
              <div className="flex p-4 mt-6 text-sm text-black opacity-90 rounded-lg bg-green-100" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium opacity-100">Rules for Writing Answers:</span>
                  <ul className="mt-1.5 list-disc pl-5">
                    <li>Start with a Direct Answer.</li>
                    <li>Be Clear and Concise.</li>
                    <li>Provide Relevant Details.</li>
                    <li>Use Examples to Clarify.</li>
                    <li>Maintain Accuracy and Completeness.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
