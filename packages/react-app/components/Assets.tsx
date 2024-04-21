import Link from "next/link";

export default function Assets(){
    return(
        <div>
            <div className="flex justify-between items-center p-2">
                <p className="font-bold text-wood">My Assets</p>
                <Link href={""} className="text-sky font-medium">See all</Link>
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-sand">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 3.428v6.335l5.357 2.396zm0 0l-5.357 8.73L12 9.764zm0 12.836v4.307l5.357-7.414zm0 4.307v-4.307l-5.357-3.107z" />
                                <path fill="currentColor" d="m12 15.266l5.357-3.107L12 9.763zm-5.357-3.107L12 15.266V9.763z" />
                                <path fill="currentColor" fillRule="evenodd" d="m12 15.266l-5.357-3.107L12 3.428l5.357 8.73zm-5-3.36l4.916-8.01V9.72zm-.073.218l4.989-2.216v5.109zm5.16-2.216v5.109l4.984-2.893zm0-.188l4.916 2.186l-4.916-8.01z" clip-rule="evenodd" />
                                <path fill="currentColor" fillRule="evenodd" d="m12 16.196l-5.357-3.043L12 20.57l5.357-7.418zm-4.757-2.508l4.672 2.658v3.814zm4.843 2.658v3.814l4.671-6.472z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <div className="uppercase font-medium">Eth</div>
                            <div className="text-sm text-wood">$3,064.36</div>
                        </div>
                    </div>
                    <div>
                        <div>$0.00</div>
                        <div>0Eth</div>
                    </div>
                </div>
            </div>
        </div>
    )
}