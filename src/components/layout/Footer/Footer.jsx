import logoWithText from '../../../assets/icons/logo/logo-sst.svg';
import logoGithub from '../../../assets/icons/contacts/ico-github.svg';
import logoFigma from '../../../assets/icons/contacts/ico-figma.svg';
import iconEmail from '../../../assets/icons/contacts/ico-email.svg';


function Footer() {
    return (
        <footer className="footer" id="footer">
            <div className="footer__container">
                <div className="footer__content">
                    <div className="footer__content-logo">
                        <a href="/">
                            <img src={logoWithText} alt="logo" draggable='false' />
                        </a>
                    </div>
                    <div className="footer__content-text">
                        <p className="footer__text body-small">© 2025 Solar System Trip (SST) · Made by Olegani4</p>
                    </div>
                    <div className='footer__content-contacts'>
                        <div className="footer__content-contact">
                            <a href="https://github.com/Olegani4/sst-react-web-app" target="_blank" rel="noopener noreferrer">
                                <img src={logoGithub} alt="github" draggable='false' style={{height: '3rem'}}/>
                            </a>
                        </div>
                        <div className="footer__content-contact">
                            <a href="https://www.figma.com" target="_blank" rel="noopener noreferrer">
                                <img src={logoFigma} alt="figma" draggable='false' style={{height: '3rem'}}/>
                            </a>
                        </div>
                        <div className="footer__content-contact">
                            <a href="mailto:" target="_blank" rel="noopener noreferrer">
                                <img src={iconEmail} alt="email" draggable='false' style={{height: '2rem'}}/>
                            </a>
                        </div>
                    </div>
                    <div className="footer__content-text">
                        <p className="footer__text-disclaimer caption">Disclaimer: All flights are fictional (for now)</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;