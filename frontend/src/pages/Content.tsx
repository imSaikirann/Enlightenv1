import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export interface Data {
  title: string;
  information: string;
  id: string;
  authorId: string;
}


export interface ApiResponse {
  data: Data;
}

export const Content: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const shareurl = window.location.origin + `/content/${id}`

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const fetchData = async (id: string) => {
    try {
      setLoading(true);
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.get<ApiResponse>(`${BACKEND_URL}/topic/getTopic/${id}`);

      console.log('Raw API response data:', res);
      console.log('Data object:', res.data.data);

      setData(res.data.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes}min read`;
  };

  const speakText = () => {
    if (!('speechSynthesis' in window)) {
      alert('Sorry, your browser does not support text to speech!');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(data?.information);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false)
    }
  };

  const handleShare = () =>{
    navigator.clipboard.writeText(shareurl)
    .then(()=>{
      alert('Url is copied')
    }).catch(err =>{
      console.log(err)
    })
  }

  return (
    <div className='bg-zinc-900 h-auto pb-96'>
      <div className="m-1 h-auto bg-zinc-900  pb-96 mt-[65px] md:mt-[80px] md:m-6 md:px-16">
        <div className="flex items-center justify-center">
          <div className='m-2 md:mt-4'>
            {loading ? (
              <div className='flex items-center justify-center h-screen'>
                <div role="status">
                  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-slate-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                </div>
              </div>
            ) : data ? (
              <div className='flex flex-col w-[400px] p-2  md:w-[780px]'>
              <div className='p-1'>
                <div className='flex flex-row items-center justify-between text-sm text-textColor opacity-45'>
                  <div className='flex items-center '>
                    <button 
                      className='text-lg hover:underline' 
                      onClick={speakText} 
                      disabled={isSpeaking}
                    >
                      {isSpeaking ? '' : 'Listen'}
                    </button>
                    {isSpeaking && (
                      <button 
                        className='ml-2' 
                        onClick={stopSpeaking}
                      >
                        Stop
                      </button>
                    )}
                  </div>
                  <div 
                    onClick={handleShare} 
                    className='cursor-pointer'
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth="1.5" 
                      stroke="currentColor" 
                      className="w-5 h-5"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" 
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className='border-[1px] mt-2 mb-2 opacity-10 '></div>
              <h3 className='text-3xl opacity-80 text-textColor md:text-3xl font-bold mb-2'>
                {data.title}
                <div className=''>
                  <h1 className='text-sm opacity-70 font-normal pt-2'>
                    {getReadTime(data.information)}
                  </h1>
                </div>
              </h3>
              <p className='text-lg text-textColor leading-8 opacity-55'>
                {data.information}
              </p>
            </div>
            
            ) : (
              <p>No data found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
