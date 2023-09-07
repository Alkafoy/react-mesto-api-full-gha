import logo from '../../images/logo.svg'
import {Link, Route, Routes} from "react-router-dom";

export default function Header({email, onLogout}) {
    const handleButtonLogout = () => {
        onLogout();
    }
    return (
        <header className="header">
            <img
                className="header__logo"
                src={logo}
                alt="Логотип заголовка"
            />
            <Routes>
                <Route path='/' element={(
                    <div className='header__wrapper'>
                        <p className='header__text'>{email}</p>
                        <button
                            type="button"
                            className="header__logout"
                            onClick={handleButtonLogout}
                        >
                            Выйти
                        </button>
                    </div>
                )} />
                <Route path='/sign-up' element={<Link to='/sign-in' className="header__text">Войти</Link>}/>
                <Route path='/sign-in' element={<Link to='/sign-up' className="header__text">Регистрация</Link>}/>
            </Routes>
        </header>
    )
}