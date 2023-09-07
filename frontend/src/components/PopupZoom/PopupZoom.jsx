export default function PopupZoom(card, isOpen, onClose) {
    return (
        <div className={`popup popup-zoom ${isOpen && 'popup_opened'}`}>
            <div className="popup-zoom__container">
                <button className="popup__close-icon" onClick={onClose}/>
                <img className="popup-zoom__image" src="#" alt=""/>
                <h2 className="popup-zoom__caption"/>
            </div>
        </div>
    )
}