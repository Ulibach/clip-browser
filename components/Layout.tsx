
import React from 'react'


const Layout: React.FC = ({children}) => {
        return (
            <div className="layout__wrapper">
                {children}
            </div>
        );
}
export default Layout