import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import {useEffect, useState} from "react";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import Register from './Register/Register';
import Login from './Login/Login';
import InfoTooltip from './InfoTooltip/InfoTooltip';
import {Route, Routes, useNavigate} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import auth from "../utils/auth";

function App() {
    // стейты для попапов
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [isImagePopup, setImagePopup] = useState(false);
    const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);

    // стейт для карточки
    const [selectedCard, setSelectedCard] = useState({});
    // Состояние сабмита
    const [isSending, setIsSending] = useState(false);
    // Состояние контекста
    const [currentUser, setCurrentUser] = useState({});
    // Состояние для хранения идентификатора удаляемой карточки
    const [deleteCardId, setDeleteCardId] = useState('');
    // стейт для массива карточек
    const [cards, setCards] = useState([]);
    // стейт для email
    const [email, setEmail] = useState('');
    // состояние навигации
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //стейт для хранения информации о всплывающей подсказке (tooltips)
    const [tooltipInfo, setTooltipInfo] = useState({access: false, message: '',});
    // Хук useNavigate для навигации между страницами
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        api.getUserInfo(token)
            .then((userInfo) => {
                setCurrentUser(userInfo);
            })
            .catch((error) => {
                console.error("Ошибка при получении информации о пользователе: ", error);
            });

    }, []);

    useEffect(() => {
        checkToken()
    }, [])

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmPopupOpen(false);
        setImagePopup(false);
        setIsTooltipPopupOpen(false);
    }

// закрытие по Escape
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isConfirmPopupOpen || selectedCard;
    useEffect(() => {
        function handleEscClose(e) {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscClose);
            return () => {
                document.removeEventListener('keydown', handleEscClose);
            }
        }
    }, [isOpen]);

    // закрытие по оверлею
    const handleOverlayClick = (e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            closeAllPopups();
        }
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleDeleteClick(cardId) {
        setDeleteCardId(cardId);
        setIsConfirmPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card)
        setImagePopup(true)
    }

    useEffect(() => {
        Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
            .then(([userData, cardsData]) => {
                setCurrentUser(userData);
                cardsData.forEach(element => element.myId = userData._id);
                setCards(cardsData)
            })
            .catch(err => console.error(`Ошибка при запросе карточек ${err}`))
    }, [])

    function handleCardDelete(event) {
        event.preventDefault();
        api.deleteCard(deleteCardId, token)
            .then(r => {
                setCards(cards.filter(card => {
                    return card._id !== deleteCardId
                }))
                closeAllPopups()
            })
            .catch(err => console.error(`Ошибка при удалении карточки ${err}`));
    }

    function handleUpdateUser(dataUser) {
        setIsSending(true);
        api.editUserInfo(dataUser, token)
            .then(r => {
                setCurrentUser(r);
                closeAllPopups();
                setIsSending(false);
            })
            .catch(err => {
                console.error(`Ошибка при изменении профиля ${err}`);
                setIsSending(false);
            })
    }

    function handleUpdateAvatar(dataUser) {
        setIsSending(true);
        api.editAvatar(dataUser, token)
            .then(r => {
                setCurrentUser(r);
                closeAllPopups();
                setIsSending(false);
            })
            .catch(err => {
                console.error(`Ошибка при изменении аватара ${err}`);
                setIsSending(false);
            })
    }

    function handleAddPlaceSubmit(dataCard) {
        setIsSending(true)
        api.addCard(dataCard, token)
            .then(r => {
                setCards([r, ...cards])
                closeAllPopups();
                setIsSending(false);
            })
            .catch(err => {
                console.error(`Ошибка при добавлении карточки ${err}`);
                setIsSending(false);
            })

    }

    function checkToken() {
        if (token) {
            auth.validateToken(token)
                .then(r => {
                    if (r) {
                        setEmail(r.email);
                        setIsLoggedIn(true);
                        navigate('/', {replace: true});
                     } else {
                        localStorage.removeItem('token');
                        setIsLoggedIn(false);
                    }
                })
                .catch(err => {
                    console.error(`Ошибка при проверке токена ${err}`);
                })
        } else {
            setIsLoggedIn(false);
        }
    }

    function handleRegister(email, password) {
        setIsSending(true);
        auth.registerUser({email, password})
            .then(r => {
                setTooltipInfo({
                    access: true,
                    message: 'Вы успешно зарегистрировались!',
                })
                setIsTooltipPopupOpen(true);
                setIsLoggedIn(true);
                setIsSending(false);
            })
            .catch(err => {
                console.error(`Произошла ошибка при регистрации ${err}`);
                setIsSending(false);
                setTooltipInfo({
                    access: false,
                    message: 'Что-то пошло не так! Попробуйте ещё раз.',
                });
                setIsTooltipPopupOpen(true);
            })
    }

    function handleLogin(email, password) {
        setIsSending(true);
        auth.loginUser({email, password})
            .then(r => {
                if (r.token) {
                    const {token} = r;
                    localStorage.setItem('token', token);
                    setEmail(email);
                    setIsLoggedIn(true);
                    navigate('/');
                } else {
                    // В этом блоке обрабатываем случай, когда авторизация не удалась
                    console.error('Сервер не вернул токен');
                }
            })
            .catch(err => {
                console.log(`Возникла ошибка при авторизации, ${err}`);
                setIsTooltipPopupOpen(true);
                setIsSending(false);
                setTooltipInfo({
                    access: false,
                    message: 'Что-то пошло не так!\n Попробуйте ещё раз.',
                })
            })
    }

    function handleLogout() {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/sign-in');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div>
                <Header
                    email={email}
                    isLoggedIn={isLoggedIn}
                    onLogout={handleLogout}
                />
                <Routes>
                    <Route path='/' element={
                        <>
                            <ProtectedRoute
                                element={Main}
                                isLoggedIn={isLoggedIn}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onDeleteConfirm={handleDeleteClick}
                                cards={cards}
                            />
                            <Footer/>
                        </>
                    }/>
                    <Route path='/sign-up'
                           element={<Register
                               onRegister={handleRegister}
                               isSending={isSending}
                           />}
                    />
                    <Route path='/sign-in'
                           element={<Login
                               onLogin={handleLogin}
                               isSending={isSending}
                           />}
                    />

                </Routes>

                <EditProfilePopup
                    onUpdateUser={handleUpdateUser}
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    isSending={isSending}
                    onOverlayClick={handleOverlayClick}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    isSending={isSending}
                    onAddPlace={handleAddPlaceSubmit}
                    onOverlayClick={handleOverlayClick}
                />

                <PopupWithForm
                    name='confirmation'
                    title='Вы уверены?'
                    nameButton='Да'
                    isOpen={isConfirmPopupOpen}
                    onClose={closeAllPopups}
                    onOverlayClick={handleOverlayClick}
                    onSubmit={handleCardDelete}
                />
                <EditAvatarPopup
                    onUpdateAvatar={handleUpdateAvatar}
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    isSending={isSending}
                    onOverlayClick={handleOverlayClick}
                />
                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopup}
                    onClose={closeAllPopups}
                    onOverlayClick={handleOverlayClick}
                />
                <InfoTooltip
                    isOpen={isTooltipPopupOpen}
                    onClose={closeAllPopups}
                    tooltipInfo={tooltipInfo}
                    onOverlayClick={handleOverlayClick}/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
