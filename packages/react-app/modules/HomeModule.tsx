import ActionTab from "@/components/ActionTab"
import ExtraDetailsTab from "@/components/ExtraDetailsTab"
import {useState} from "react"

export default function HomeModule() {
  const [extraDetails, setExtraDetails] = useState("assets")

  return (
    <div>
      <div className="flex flex-col items-center my-12">
        <span className="text-[12px] text-forest">My Balance</span>
        <div className="text-2xl font-bold">$0.00</div>
      </div>
      <div className="flex w-[80%] mx-auto justify-between">
        <ActionTab
          tabname="Add"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"/>
            </svg>
          }
        />
        <ActionTab
          tabname="Swap"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
              <path fill="currentColor"
                    d="M12.78 3.22a.75.75 0 1 0-1.06 1.06L13.44 6H4.75a.75.75 0 0 0 0 1.5h8.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06zm-4.5 7.56a.75.75 0 1 0-1.06-1.06l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06L6.56 14h8.69a.75.75 0 0 0 0-1.5H6.56z"/>
            </svg>
          }
        />
        <ActionTab
          tabname="Transfer"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6v13m0-13l4 4m-4-4l-4 4"/>
            </svg>
          }
        />
      </div>
      <div>
        <div className="flex justify-between">
          <ExtraDetailsTab
            detailName="assets"
            currentDetail={extraDetails}
            setDetail={setExtraDetails}
          />
          <ExtraDetailsTab
            detailName="transfers"
            currentDetail={extraDetails}
            setDetail={setExtraDetails}
          />
        </div>
      </div>
    </div>
  )
}