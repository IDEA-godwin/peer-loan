import { useEffect, useState } from "react"

type ExtraDetailsTabProps = {
    detailName: string,
    currentDetail: string,
    setDetail: any
}

export default function ExtraDetailsTab({detailName, currentDetail, setDetail}: ExtraDetailsTabProps){
    let [active, setActive] = useState(false)

    useEffect(()=>{
        if(detailName === currentDetail){
            setActive(true)
        }else{
            setActive(false)
        }
    },[detailName, currentDetail])

    return(
        <div onClick={()=>{setDetail(detailName)}} className={`w-full text-center p-2 font-medium capitalize ${active ? "border-b border-black text-black" : "text-wood"}`}>
            {detailName}
        </div>
    )
}