import { useRecoilValue } from "recoil";
import { notificatiosnData } from "../store/atoms/dataAtoms";
import { useNavigate } from "react-router-dom";

export default function Notifications() {
    const navigate = useNavigate();
    const notificationData = useRecoilValue(notificatiosnData);

    const handleView = (item:any) => {
        const id = item.topicId;
        navigate(`/content/${id}`);
    };

    return (
        <div className="bg-white pb-72 h-screen">
            <div className="bg-white m-3 h-auto mt-[75px] md:mt-[80px] md:pt-6 md:m-6 md:px-16">
                <div className="flex flex-col">
                    {notificationData.length === 0 ? (
                        <div className="text-center text-gray-500 py-6 flex items-center justify-center">
                            🚫 No notifications yet. We'll notify you if anything comes through!
                        </div>
                    ) : (
                        notificationData.map((item, index) => (
                            <div key={index}>
                                <h2 
                                    className="bg-zinc-900  px-4 py-3 mb-2  rounded-sm text-sm cursor-pointer md:mb-2 lg:mb-3 lg:py-4 lg:px-4 text-textColor font-logo"
                                    onClick={() => handleView(item)}
                                >
                                    🎉 Someone answered your question! 👀 Click here to reveal the answer.
                                </h2>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
