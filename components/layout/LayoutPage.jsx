import { useState } from 'react';
import AccessDenied from '../accessDenied';
import { Footer } from '../footer/Footer';
import { Navbar } from '../navbar/Navbar';

export default function LayoutPage({ session, children }) {
    const [showExpandedMenu, setShowExpandedMenu] = useState(false);
    return (<>
        <Navbar
            setExpandedMenu={setShowExpandedMenu}
            showExpandedMenu={showExpandedMenu}
        />
        {
            !session ? (
                <AccessDenied />
            ) : (
                <main className='mainContent'>
                    {children}
                </main>
            )
        }

        <Footer />
    </>)
}
