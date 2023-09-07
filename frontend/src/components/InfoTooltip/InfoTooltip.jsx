import React from "react";

export default function InfoTooltip({isOpen, onClose, tooltipInfo, onOverlayClick}) {
    const { message, access } = tooltipInfo;

    return (
        <div className={`popup popup_info-tool-tip ${isOpen && 'popup_opened'}`} onClick={onOverlayClick}>
            <div className='popup__container'>
                <button
                    className="popup__close-icon"
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}
                />
                <div className={`popup__access ${access ? 'popup__access_type_granted' : 'popup__access_type_denied'}`}></div>
                <h2 className='popup__access-caption'>{message}</h2>
            </div>
        </div>
    )
}