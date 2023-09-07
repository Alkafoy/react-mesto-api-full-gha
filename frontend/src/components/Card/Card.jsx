import {useContext} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LikeButton from "../LikeButton/LikeButton";

export default function Card({card, onCardClick, onDeleteConfirm}) {
    const currentUser = useContext(CurrentUserContext);
    return (
        <article>
            <img
                className="element__image"
                src={card.link}
                alt={`Где-то в ${card.name}`}
                onClick={() => onCardClick({name: card.name, link: card.link})}
            />
            <div className="element__caption">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__like-container">
                    <LikeButton likes={card.likes} myId={currentUser._id} cardId={card._id}/>
                </div>
            </div>
            {currentUser._id === card.owner && <button
                className="element__trash"
                type="button"
                onClick={() => onDeleteConfirm(card._id)}
            />}

        </article>
    )
}