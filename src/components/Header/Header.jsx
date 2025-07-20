import logoWithText from '../../assets/icons/logo/logo-sst-with-text.svg';

function Header() {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <img src={logoWithText} alt="logo" draggable='false' />
                </div>
                <div className="header__slogan">
                    <p className="header__slogan-text heading-3">Explore the Solar System like never before</p>
                </div>
            </div>
        </header>
    )
}

export default Header;