import React, { useEffect, useState } from 'react';
import { getUsersList, onCreateUser, onDeleteUser, onChangeUser } from './actions';
import { connect } from 'react-redux';
import Form from './components/Form';

const App = ({ usersList, onCreateUser, getUsersList, onDeleteUser, onChangeUser }) => {
    const [formIsOpened, onChangeFormIsOpened] = useState({ opened: false, headerText: '' })
    const [clickedElement, changeClickedElement] = useState('');
    const [currentPage, changeCurrentPage] = useState('');

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

    const prevPage = () => {
        changeCurrentPage(currentPage - 1)
    }

    const nextPage = () => {
        changeCurrentPage(currentPage + 1)
    }

    const spliceUsersList = () => {
        return usersList.usersList.usersList.splice(currentPage, 5)
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
                {Object.keys(usersList.usersList).length && usersList.usersList.usersList.map(elem => {
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
                    onClick={prevPage}
                    disabled={currentPage < 1}
                >{'<'}</button>
                <button
                    onClick={nextPage}
                    disabled={currentPage >= usersList.length}
                >{'>'}</button>
            </footer>
            {formIsOpened.opened &&
                <Form
                    onCreateUser={onCreateUser}
                    onChangeUser={onChangeUser}
                    clickedElement={clickedElement}
                    headerText={formIsOpened.headerText}
                    cancelForm={openForm}
                />}
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