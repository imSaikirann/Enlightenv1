import { useRecoilValue } from "recoil"
import { notificatiosnData } from "../store/atoms/dataAtoms"

export default function Notifications()
{
    const notificationData = useRecoilValue(notificatiosnData)
    return (
        <div className='bg-back pb-72 '>
     <div className="bg-back m-3  h-auto mt-[65px] md:mt-[80px] md:pt-6  md:m-6 md:px-16">
     {notificationData.map((item) => (
        <h2 key={item}>Some one answersed your question</h2>
))}

     </div>
        </div>
    )
}