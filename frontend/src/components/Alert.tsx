export default function Alert(props:any) {
    return (

        <>

            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                <span className="font-medium">{props.message}</span> 
            </div>

        </>

    )
}