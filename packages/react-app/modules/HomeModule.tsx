import ActionTab from "@/components/ActionTab"
import Assets from "@/components/Assets"
import ExtraDetailsTab from "@/components/ExtraDetailsTab"
import {useState} from "react"

type IHomeModuleProps = {
    connectDetails: {userAddress: string, isConnected: boolean}
}

export default function HomeModule({ connectDetails }:IHomeModuleProps) {
  const [extraDetails, setExtraDetails] = useState("assets")

  function copyAddress(){
    navigator.clipboard.writeText(connectDetails.userAddress)
    alert("address copied")
  }
  return (
    <div>
      <div className="flex flex-col items-center my-12">
        <span className="text-[12px] text-forest">My Balance</span>
        <div className="text-2xl font-bold">$0.00</div>
        <div className="flex">
            <div>wallet address: {connectDetails.isConnected && connectDetails.userAddress}</div>
            {
                connectDetails.isConnected
                &&
                <div onClick={copyAddress}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor">
                            <rect width="9" height="13" x="6.5" y="6.5" rx="1.5" />
                            <path d="M8.5 6A1.5 1.5 0 0 1 10 4.5h6A1.5 1.5 0 0 1 17.5 6v10a1.5 1.5 0 0 1-1.5 1.5" />
                        </g>
                    </svg>
                </div>
            }
        </div>
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
        <div className="flex justify-between my-4">
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
        <div>
          {
            extraDetails == "assets"
            &&
            <Assets />
          }
        </div>
      </div>
    </div>
  )
}