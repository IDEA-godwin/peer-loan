import Footer from "../components/Footer";
import HomeModule from "../modules/HomeModule";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
    const [userAddress, setUserAddress] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const { address, isConnected } = useAccount();

    let [currentPage, setCurrentPage] = useState("home")

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isConnected && address) {
            setUserAddress(address);
        }
    }, [address, isConnected]);

    const switchPage = (page: string) => {
      setCurrentPage(page);
      return;
    }

    if (!isMounted) {
        return null;
    }

    return (
        <div className="flex h-[100%] flex-col justify-between items-between">
            <div className="p-4">
                <div className="flex justify-start items-start">
                    {isConnected ? (
                        <div className="h2 text-center">
                            Your address: {userAddress}
                        </div>
                    ) : (
                        <div className="text-sm">No Wallet Connected</div>
                    )}
                </div>
                {
                    currentPage == "home"
                    &&
                    <HomeModule />
                }
            </div>
            <Footer switchPage={switchPage} currentPage={currentPage} />
        </div>
        
    );
}
