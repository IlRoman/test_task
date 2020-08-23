import React, { useState } from 'react';
import './form.scss';

const Form = ({ onCreateUser, onChangeUser, headerText, cancelForm, clickedElement }) => {
    const [name, onChangeName] = useState('');
    const [surname, onChangeSurname] = useState('');

    const handleOkButton = (e) => {
        e.preventDefault()
        if (headerText === 'Добавить пользователя') {
            onCreateUser(name, surname)
        } else {
            onChangeUser(clickedElement, name, surname)
        }
        cancelForm(false, '')
    }

    return (
        <form className="form">
            <h2>{headerText}</h2>
            <input
                className="form__input"
                type="text"
                placeholder="Введите имя пользователя"
                value={name}
                onChange={(e) => onChangeName(e.target.value)}
            />
            <input
                className="form__input"
                type="text"
                placeholder="Введите фамилию пользователя"
                value={surname}
                onChange={(e) => onChangeSurname(e.target.value)}
            />
            <div className="form__buttons-wrapper">
                <button
                    className="form__button"
                    onClick={handleOkButton}
                >OK</button>
                <button
                    className="form__button"
                    onClick={() => cancelForm(false, '')}
                >Cancel</button>
            </div>
        </form >
    )
}

export default Form;