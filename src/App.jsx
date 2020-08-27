import React, { useEffect, useState } from 'react';
import { getUsersList, onCreateUser, onDeleteUser, onChangeUser } from './actions';
import { connect } from 'react-redux';
import Form from './components/Form';

const App = ({ usersList, onCreateUser, getUsersList, onDeleteUser, onChangeUser }) => {
    const [formIsOpened, onChangeFormIsOpened] = useState({ opened: false, headerText: '' })
    const [clickedElement, changeClickedElement] = useState('');
    const [currentPage, changeCurrentPage] = useState(0);

    useEffect(() => {
        getUsersList();
    }, [])

    const openForm = (isOpened, text, userId) => {
        changeClickedElement(userId)
        onChangeFormIsOpened({
            opened: isOpened,
            headerText: text,
        })
    }

    const spliceUsersList = () => {
        let x = usersList.usersList.usersList.slice(currentPage * 5, currentPage * 5 + 5);
        return x
    }

    return (
        <>
            <header className="header">
                <button
                    className="header__create-user-button"
                    onClick={() => openForm(true, 'Добавить пользователя')}
                >Добавить нового пользователя</button>
            </header>
            <div className="users-list">
                {Object.keys(usersList.usersList).length && spliceUsersList().map(elem => {
                    return (
                        <div className="users-list__wrapper" key={elem.id}>
                            <div className="users-list__elem">
                                {`${elem.name} - ${elem.surname}`}
                            </div>
                            <div
                                className="users-list__edit"
                                onClick={() => openForm(true, 'Редактировать пользователя', elem.id)}
                            >Редактировать</div>
                            <div
                                className="users-list__delete"
                                onClick={() => onDeleteUser(elem.id)}
                            >+</div>
                        </div>
                    )
                })}
            </div>
            <footer className="footer">
                <button
                    className="footer__button"
                    onClick={() => changeCurrentPage(+currentPage - 1)}
                    disabled={currentPage < 1}
                >{'<'}</button>
                <button
                    className="footer__button"
                    onClick={() => changeCurrentPage(+currentPage + 1)}
                    disabled={
                        currentPage
                            ? currentPage * 5 + 5 > usersList.usersList.usersList.length
                            : ''
                    }
                >{'>'}</button>
            </footer>
            {
                formIsOpened.opened &&
                <Form
                    onCreateUser={onCreateUser}
                    onChangeUser={onChangeUser}
                    clickedElement={clickedElement}
                    headerText={formIsOpened.headerText}
                    cancelForm={openForm}
                />
            }
        </>
    )
}

const mapState = state => ({
    usersList: state.usersList
})

const mapDispatch = {
    getUsersList,
    onCreateUser,
    onDeleteUser,
    onChangeUser,
}

export default connect(mapState, mapDispatch)(App);