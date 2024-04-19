import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { login } from '../../actions/userActions';
import { useNavigate, useLocation } from 'react-router-dom';
import "react-toastify/dist/react-toastify.cjs.development";
import "react-toastify/dist/";
import './login.css'

function LoginScreen() {
    // Забираем почту и пароль из полей в переменные
    const [loginUser, setloginUser] = useState('')
    const [password, setPassword] = useState('')

    // для перенаправления пользователя на другую страницу
    let navigate = useNavigate();
    // получаем информацию о текущем маршруте
    let location = useLocation();
    // ссылка на функцию dispatch из Redux хранилища
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/files'
    // извлекаем данные из состояния(state) хранилища(store) Redux
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(loginUser, password))
    }

    return (

        <div className='login-container'>
            <h1 className='login-text'>Введите данные пользователя</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <Form className='login-form' onSubmit={submitHandler}>
                <Form.Group controlId='loginUser'>
                    <Form.Label>Логин</Form.Label>
                    <Form.Control
                        type='loginUser'
                        placeholder='Введите почту'
                        value={loginUser}
                        onChange={(e) => setloginUser(e.target.value)}
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

                <Button type='submit' variant='primary' className='bg-zinc-700'>
                    Войти
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Зарегистрироваться если нет аккаунта
                    </Link>
                </Col>
            </Row>
        </div>
    )
}

export default LoginScreen
