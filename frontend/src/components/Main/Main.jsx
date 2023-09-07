import {useContext} from "react";
import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDeleteConfirm, cards}) {
    const currentUser = useContext(CurrentUserContext);


    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-wrap">
                    <img className="profile__avatar" src={currentUser.avatar ? currentUser.avatar : '#'} alt="Аватар"/>
                    <button
                        className="profile__avatar-edit"
                        type="button"
                        aria-label="Редактировать аватар"
                        onClick={onEditAvatar}
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name ? currentUser.name : ''}</h1>
                    <button
                        className="profile__edit-button"
                        type="button"
                        aria-label="Редактировать профиль"
                        onClick={onEditProfile}
                    />
                    <p className="profile__description">{currentUser.about ? currentUser.about : ''}</p>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="Добавить"
                    onClick={onAddPlace}
                ></button>
            </section>
            <section className="elements" aria-label="Места">
                <ul className="elements__list">
                    {cards.map(data => {
                        return (
                            <li className="element" key={data._id}>
                                <Card card={data} onCardClick={onCardClick} onDeleteConfirm={onDeleteConfirm}/>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}