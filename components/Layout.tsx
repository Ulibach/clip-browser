
import React from 'react'
import Footer from './Footer';


const Layout: React.FC = ({children}) => {
        return (
            <div className="layout__wrapper">
                {children}
            </div>
        );
}
export default Layout