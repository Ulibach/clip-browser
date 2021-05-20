import React from 'react'

interface FooterProps {

}

const Footer: React.FC<FooterProps> = ({}) => {
        return (
            <footer>
                <div className="footer__container">
                    <p>made with ♥ by me</p>
                </div>
            </footer>
        );
}
export default Footer