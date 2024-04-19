import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import { listUsers, deleteUser } from '../../actions/userActions';
import Modal from '../../components/modal/Modal';
import PersonalFiles from '../../components/table/UserFiles';
import { variables } from '../../utils/variables';
import axios from '../../utils/axios';
import './usersList.css';
import Tippy from '@tippyjs/react';

function UserListScreen() {

    // Модалка
    const [openModal, setOpenModal] = useState(false)
    const [data, setData] = useState([]);

    const dispatch = useDispatch()
    let history = useNavigate();

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history('/login')
        }
    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            dispatch(deleteUser(id))
        }
    }

    async function getFilesUser(idUser) {
        try {
            await axios.get(
                `${variables.API_URL}files/user/${idUser}`,
                {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Fasca ${userInfo.token}`
                    }
                }
            ).then((responseData) => {
                setData(responseData.data) 
            })
            
        } catch (err) { console.error(err.toJSON()) }
    }
    
    const currentUserId = (id) => {
        try {
            getFilesUser(id)
            setOpenModal(true)
        } catch (err) { console.error(err.toJSON()) }

    }

    return (
        <FormContainer>
            <h1 className='text-center'>Пользователи</h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <table>
                            <thead >
                                <tr >
                                    <th>ID_</th>
                                    <th>Имя</th>
                                    <th>Почта</th>
                                    <th>Является ли админом</th>
                                    <th>изменение</th>
                                    <th>удаление</th>
                                    <th>Файлы</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className='fas fa-check-double fa-2x' style={{ color: 'green' }}></i>
                                        ) : (
                                            <div style={{ color: 'red' }}>X</div>
                                        )}</td>

                                        <td>                   
                                                
                                            <LinkContainer to={`/admin/user/${user._id}/edit`} >
                                                    <Button variant='light' className='btn-sm' style={{ backgroundColor: 'transparent' }}>
                                                        <Tippy content={<span>Редактировать {user.name}</span>}>
                                                            <i className='fas fa-edit fa-3x'></i>
                                                        </Tippy>
                                                    </Button>
                                            </LinkContainer>
                                            </td>
                                            <td>        
                                            <Tippy content={<span>Удалить {user.name}</span>}>
                                                <Button variant='primary' className='btn-sm' style={{ backgroundColor: 'transparent' }}
                                                    onClick={() => deleteHandler(user._id)}>
                                                    <i className='fas fa-trash fa-3x' style={{ color: 'red' }}></i>
                                                </Button>
                                            </Tippy>
                                            </td>
                                            <td>        
                                            <Tippy content={<span>Файлы {user.name}</span>}>
                                                <Button className='btn-sm ' style={{ backgroundColor: 'transparent' }}
                                                    onClick={() => currentUserId(user._id)}>
                                                    <i className='fas fa-file fa-3x' style={{ color: 'blue' }}></i>
                                                </Button>
                                            </Tippy>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
            <div>
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <PersonalFiles files={data} />
                </Modal>
            </div>
        </FormContainer>
    )
}

export default UserListScreen
