import React, { useEffect, useState } from 'react';
import { askQuestion } from '../api/data';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { questionAtom, selectedQuestion } from '../store/atoms/dataAtoms';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate, Link } from 'react-router-dom';

export interface selectedData {
    question: string;
}

export interface Data {
    id: string;
    authorId: string;
    question: string;
    createdAt: string;
}

const Home: React.FC = () => {
    const [data, setData] = useRecoilState<Data[]>(questionAtom);
     const setQuestion = useSetRecoilState(selectedQuestion);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await askQuestion();
                console.log(res.bulk)
                if (Array.isArray(res.bulk)) {
                    setData(res.bulk);
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

    const onHandleId = (selectedQuestion: any) => {
        console.log(selectedQuestion)
        setQuestion([{
            question: selectedQuestion,
            id: ''
        }]);
        navigate('/create')
    }

    return (
        <div className='bg-white'>
            <div className="bg-white m-3 h-auto mt-[65px] md:mt-[80px] md:pt-6 md:m-6 md:px-16">
                <div className="flex items-center justify-center flex-col">
                    <div className='flex justify-between items-center space-x-8 '>
                        <h2 className='text-sm font-logo font-normal opacity-75 p-6'>
                            Total questions: {data.length}
                        </h2>
                        <div className="flex items-center flex-row  space-x-1 text-primary  cursor-pointer hover:opacity-100">
                            <div className='hover:opacity-100'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 opacity-75 ">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                            </div>
                            <div>
                                <Link to='/askquestions'><h3 className="text-black opacity-75 text-sm px-2   ">Ask a question</h3></Link>
                            </div>
                        </div>
                    </div>
                    <div className='border-t-2  mt-3 w-full'>
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
                                <div key={item.id} className="px-4 py-2 mt-4 mb-4 md:w-[800px] lg:w-[900px] bg-zinc-900 border-textColor rounded-lg" onClick={() => onHandleId(item)}>
                                    <h1 className="text-textColor font-create text-md md:text-2xl">
                                        {item.question}
                                    </h1>
                                    <div className='flex flex-row space-x-3 justify-between text-textColor opacity-50'>
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
