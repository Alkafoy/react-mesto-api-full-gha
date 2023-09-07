import {useEffect, useState} from "react";
import api from "../../utils/api.js";

const token = localStorage.getItem('token');

export default function LikeButton({likes, myId, cardId}) {
    const [isLiked, setIsLiked] = useState(false);
    const [counter, setCounter] = useState(likes.length);

    useEffect(() => {
        setIsLiked(likes.some(element => myId === element))
    }, [likes, myId])

    function handleLike() {
        if (isLiked) {
            api.deleteLike(cardId, token)
                .then(r => {
                    setIsLiked(false)
                    setCounter(r.likes.length)
                })
                .catch(err => console.error(`Что-то не так с удалением лайка ${err}`))
        } else {
            api.addLike(cardId, token)
                .then(r => {
                    setIsLiked(true);
                    setCounter(r.likes.length)
                })
                .catch(err => console.error(`Что-то не так с добавлением лайка ${err}`))
        }
    }


    return (
        <>
            <button className={`element__like ${isLiked && `element__like_active`}`} type="button" aria-label="Нравится" onClick={handleLike}/>
            <p className="element__like-counter">{counter}</p>
        </>
    )
}