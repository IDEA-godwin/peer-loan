import { FC, ReactNode } from "react";
import Header from "./Header";

interface Props {
    children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <div className="bg-gypsum overflow-hidden min-h-screen">
                <Header />
                <div className="">
                    {children}
                </div>
            </div>
        </>
    );
};

export default Layout;
