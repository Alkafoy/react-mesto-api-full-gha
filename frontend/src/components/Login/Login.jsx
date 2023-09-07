import React, {useState} from "react";
//TODO: Сделать общий компонент AuthForm для форм авторизации, чтобы не дублировать одинаковую верстку в Login и Register
export default function Login({onLogin}) {
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
        onLogin(email, password);
        setEmail('');
        setPassword('');
    }

    return (
        <div className='start-page'>
            <h1 className='start-page__title'>Вход</h1>
            <form className='start-page__form' onSubmit={handleSubmit}>
                <input
                    type="email"
                    name='email'
                    className='start-page__input start-page__input_email'
                    placeholder='Email'
                    onChange={handleEmailChange}
                    value={email || ''}
                    required
                />
                <input
                    type="password"
                    name="password"
                    className='start-page__input start-page__input_password'
                    placeholder='Пароль'
                    onChange={handlePasswordChange}
                    value={password || ''}
                    required
                />
                <button
                    type="submit"
                    className='start-page__submit'>
                    Войти
                </button>
            </form>
        </div>
    )
}