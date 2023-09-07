export default function PopupWithForm({name, title, nameButton, children, isOpen, onClose, onOverlayClick, onSubmit, isSending}) {
    //TODO: Разобраться, как добавить универсальную обертку Popup для любых попапов, в которой будет обработка оверлея, крестика и Escape
    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={onOverlayClick}>
            <div className="popup__container">
                <button
                    className="popup__close-icon"
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}
                />
                <form
                    className="popup__form popup__form_edit"
                    noValidate=""
                    onSubmit={onSubmit}>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button
                        disabled={isSending}
                        className="popup__submit-button"
                        type="submit"
                        aria-label="Сохранить"
                    >
                        {nameButton || 'Сохранить'}
                    </button>
                </form>
            </div>
        </div>
    )
}