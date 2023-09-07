import PopupWithForm from "../PopupWithForm/PopupWithForm";
import {useRef} from "react";


export default function EditAvatarPopup({onClose, isOpen, onUpdateAvatar, isSending, onOverlayClick}) {
    const inputAvatarRef = useRef(null);
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({avatar: inputAvatarRef.current.value})
    }

    return (
        <PopupWithForm
            name='editAvatar'
            title='Обновить аватар'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onOverlayClick={onOverlayClick}
            isSending={isSending}
            // onUpdateAvatar={onUpdateAvatar}
        >
            <input
                ref={inputAvatarRef}
                className="popup__input popup__input_type_picture-link"
                id="url-avatar"
                name="avatar"
                type="url"
                placeholder="Ссылка на аватар"
                required=""
            />
            <span className="url-avatar-error popup__input-error"/>
        </PopupWithForm>
    )
}