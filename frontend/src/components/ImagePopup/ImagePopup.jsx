export default function ImagePopup({card, isOpen, onClose, onOverlayClick}) {
    return (
        <div className={`popup popup-zoom ${isOpen && 'popup_opened'}`} onClick={onOverlayClick}>
            <div className="popup-zoom__container">
                <button className="popup__close-icon" onClick={onClose}/>
                <img className="popup-zoom__image" src={card.link} alt={`Картинка ${card.name}`}/>
                <h2 className="popup-zoom__caption">{card.name}</h2>
            </div>
        </div>
    )
}