import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { useNavigate } from 'react-router-dom';


function ProfileScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    
    let history = useNavigate();
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile


    useEffect(() => {
        if (!userInfo) {
            history('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Пароли не совпадают')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'login': login,
                'password': password
            }))
            setMessage('')
        }

    }
    return (

        <Container className='flex justify-center'>
                <Col md={8}>
                    <h2>Профиль пользователя</h2>

                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name'>
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                required
                                type='name'
                                placeholder='Введите имя пользователя'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Адрес почты</Form.Label>
                            <Form.Control
                                required
                                type='email'
                                placeholder='Введите почту'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='login'>
                            <Form.Label>Логин</Form.Label>
                            <Form.Control
                                required
                                type='login'
                                placeholder='Введите логин'
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Введите пароль'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='passwordConfirm'>
                            <Form.Label>Повтор пароля</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Повтор пароля'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary' className='bg-zinc-700'>
                            Сохранить изменения
                        </Button>

                    </Form>
                </Col>
        </Container>
    )
}

export default ProfileScreen