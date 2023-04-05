import { useState } from "react";
import { Footer } from "../components/footer/Footer";
import FloatMenu from "./float-menu/FloatMenu";
import { Navbar } from "./navbar/Navbar";

interface Props {
    children: JSX.Element;
}

export default function Layout({ children }: Props) {
    const [showExpandedMenu, setShowExpandedMenu] = useState(false)

    return (
        <>
            <Navbar setExpandedMenu={setShowExpandedMenu} showExpandedMenu={showExpandedMenu} />
            <main className="mainContent">
                {children}
            </main>
            <Footer />
        </>
    )
}