import { JSXElementConstructor } from "react"

type IActionTabProps = {
    tabname: string,
    icon: any
}

export default function ActionTab({tabname, icon}:IActionTabProps){
    return(
        <div className="flex items-center gap-1">
            {icon}
            {tabname}
        </div>
    )
}