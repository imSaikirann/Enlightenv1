import React, { useEffect, useState } from 'react';
import { getData } from '../api/data';
import { useRecoilState } from 'recoil';
import { dataAtom } from '../store/atoms/dataAtoms';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

export interface Data {
    title: string;
    information: string;
    id: string;
    authorId: string;
    authorName: string;
    createdAt: string;
}


const Home: React.FC = () => {
    const [data, setData] = useRecoilState<Data[]>(dataAtom);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getData();
                if (Array.isArray(res.data)) {
                    setData(res.data);
                } else {
                    console.error('Data is not an array:', res);
                    setData([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [setData]);

  
    const getReadTime = (text: string) => {
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    };

    const onHandleId = (id: string) => {
        navigate(`/content/${id}`)
    }
    return (
        <div className='bg-back pb-72 '>
            <div className="bg-back m-3  h-auto mt-[65px] md:mt-[80px] md:pt-6  md:m-6 md:px-16">
                <div className="flex items-center justify-center ">
                    <div>
                        {data.length > 0 && (
                            <div className='text-white flex flex-col items-center justify-center space-y-3  pt-8  md:p-6 pb-8 md:pb-12 '>
                                <h2 className='hidden md:block text-4xl md:text-5xl font-semibold  opacity-70 text-center'>Have questions on your mind?</h2>
                                <h2 className='md:hidden text-3xl md:text-5xl font-medium opacity-70 font-create  '>Have questions ?</h2>


                                <h2 className='text-2xl text-center md:text-5xl font-medium opacity-70 font-create'>Get Answers on Enlighten </h2>
                            </div>
                        )}

                        {loading ? (


                            <div className='flex items-center justify-center h-screen'>
                                <div role="status">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-slate-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>


                        ) : (
                            data.map((item) => (
                                <div key={item.id} className="p-4 mb-4  md:w-[800px] lg:w-[900px] bg-zinc-900  border-textColor rounded-lg mt-2 " onClick={() => onHandleId(item.id)}>
                                    <h1 className="opacity-50  text-textColor font-create md:opacity-50 md:text-md mb-2">
                                        <div>{getReadTime(item.information)} </div>
                                    </h1>
                                    

                                    <h1 className=" font-semibold text-textColor font-create text-xl md:text-2xl mb-2">
                                        {item.title}
                                    </h1>
                                    <p className=" w-full mt-1 text-textColor md:text-md opacity-80">
                                        {item.information.slice(0, 200)}....
                                    </p>
                                    <div className='flex flex-row space-x-3 justify-between text-textColor opacity-50 mt-4'>


                                        <h1 className="  text-textColor font-create  md:text-md mb-2">
                                            Published by    {item.authorName}
                                        </h1>

                                        <div>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</div>

                                    </div>


                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
