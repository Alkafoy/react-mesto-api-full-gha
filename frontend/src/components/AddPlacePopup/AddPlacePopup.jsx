import PopupWithForm from "../PopupWithForm/PopupWithForm";
import {useState} from "react";


export default function AddPlacePopup({onClose, isOpen, onAddPlace, isSending, onOverlayClick}) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({ title, link });

    }

    return (
        <PopupWithForm
            name='addCard'
            title='Новое место'
            nameButton='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onOverlayClick={onOverlayClick}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_type_picture-title"
                id="title-input"
                name="title"
                type="text"
                placeholder="Название"
                required=""
                minLength={2}
                maxLength={30}
                value={title}
                onChange={handleTitleChange}
            />
            <span className="title-input-error popup__input-error"/>
            <input
                className="popup__input popup__input_type_picture-link"
                id="url-input"
                name="link"
                type="url"
                placeholder="Ссылка на картинку"
                required=""
                value={link}
                onChange={handleLinkChange}
            />
            <span className="url-input-error popup__input-error"/>
        </PopupWithForm>
    )
}