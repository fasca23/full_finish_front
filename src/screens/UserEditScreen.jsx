import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserEditScreen() {
    const { id } = useParams();
    const userId = Number(id);
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    let history = useNavigate();
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate,
        loading: loadingUpdate,
        success: successUpdate } = userUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history('/admin/userlist')
        } else {

            if (user && (!user.name || user._id !== Number(userId))) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [user, userId, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: user._id, name, email, isAdmin, login }))
        toast.success('Пользователь успешно обновлен')
    }

    return (
        <div className='pl-3'>
            <Link to='/admin/userlist'>
                Вернуться
            </Link>

            <FormContainer>

                <h1 className='text-center'>Настойки пользователя</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> :
                    error ? <Message variant='danger'>{error}</Message>
                        : (
                            <Form onSubmit={submitHandler}>

                                <Form.Group controlId='name'>
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control
                                        type='name'
                                        placeholder='Введите имя'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='login'>
                                    <Form.Label>Логин</Form.Label>
                                    <Form.Control
                                        type='login'
                                        placeholder='Введите логин'
                                        value={login}
                                        onChange={(e) => setLogin(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='email'>
                                    <Form.Label>Адрес почты</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Введите почту'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='isadmin'>
                                    <Form.Check
                                        type='checkbox'
                                        label='является ли админом'
                                        checked={isAdmin}
                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                    >
                                    </Form.Check>
                                </Form.Group>

                                <Button type='submit' variant='primary' className='bg-zinc-700'>
                                    Сохранить изменение
                                </Button>

                            </Form>
                        )}
            </FormContainer >
        </div>
    )
}
export default UserEditScreen