import React, {useState} from "react";
import {Link} from "react-router-dom";

export default function Register({onRegister}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(email, password);
        setEmail('');
        setPassword('');
    }

    return (
        <div className='start-page'>
            <h1 className='start-page__title'>Регистрация</h1>
            <form className='start-page__form' onSubmit={handleSubmit}>
                <input
                    name='email'
                    type='email'
                    className='start-page__input start-page__input_email'
                    placeholder='Email'
                    value={email || ''}
                    onChange={handleEmailChange}
                />
                <input
                    name='password'
                    type="password"
                    className='start-page__input start-page__input_password'
                    placeholder='Пароль'
                    value={password || ''}
                    onChange={handlePasswordChange}
                    required
                />
                <button
                    type="submit"
                    className='start-page__submit'
                    aria-label="Зарегистрироваться на сайте"
                >
                    Зарегистрироваться
                </button>
                <Link to='/sign-in' className='start-page__span' href="#">Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    )
}