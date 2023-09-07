import PopupWithForm from "../PopupWithForm/PopupWithForm";
import {useContext, useEffect, useState} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";


export default function EditProfilePopup({onClose, isOpen, onUpdateUser, isSending, onOverlayClick}) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description
        });
    }

    return (
        <PopupWithForm
            name={'editProfile'}
            title={'Редактировать профиль'}
            isOpen={isOpen}
            onClose={onClose}
            onOverlayClick={onOverlayClick}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_type_name"
                id="name-input"
                name="name"
                type="text"
                value={name || ''}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя"
                minLength={2}
                maxLength={40}
                required=""
                disabled={isSending}
            />
            <span className="name-input-error popup__input-error"/>
            <input
                className="popup__input popup__input_type_job"
                id="description-input"
                name="info"
                type="text"
                value={description || ''}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Описание"
                minLength={2}
                maxLength={200}
                required=""
                disabled={isSending}
            />
            <span className="description-input-error popup__input-error"/>
        </PopupWithForm>
    )
}