import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import { useNavigate, useLocation } from 'react-router-dom';

function RegisterScreen() {

    // Регулярки для проверки емейла и пароля
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const password_regexp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g
    const login_regexp = /^[a-zA-Z][a-zA-Z0-9]{3,19}/


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [messageemail, setMessageemail] = useState('')
    const [message2, setMessage2] = useState('')
    const [message3, setMessage3] = useState('')


    const dispatch = useDispatch()
    let history = useNavigate();
    let location = useLocation();

    const redirect = location.search ? location.search.split('=')[1] : '/files'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history(redirect)

        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (!EMAIL_REGEXP.test(email)) {
            setMessageemail('Нужно ввести действующий емейл')
        } else if (!password_regexp.test(password)) {
            setMessage2('Слишком простой пароль (более 6 символов, 1 заглавная, 1 цифра, 1 спец. символ)')
        } else if (!login_regexp.test(login)) {
            setMessage3('Слишком простой логин (от 4 до 20 символов, 1ая всегда буква, только латиница или цифры)')
        } else if (password !== confirmPassword) {
            setMessage('Неправильный повтор пароля')
        }else{
            dispatch(register(name, email, login, password))  
        } 
    }

    return (
        <FormContainer>
            <h1>Внесите данные для регистрации</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Имя</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Введите имя'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                {messageemail && <Message variant='danger'>{messageemail}</Message>}
                <Form.Group novalidate controlId='email'>
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

                {message3 && <Message variant='danger'>{message3}</Message>}
                <Form.Group controlId='login'>
                    <Form.Label>Логин</Form.Label>
                    <Form.Control
                        required
                        type='login'
                        placeholder='Придумайте логин'
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                
                {message2 && <Message variant='danger'>{message2}</Message>}
                <Form.Group controlId='password'>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Введите пароль'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                {message && <Message variant='danger'>{message}</Message>}
                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Подтвердите пароль</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Еще раз пароль (для подтверждения)'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='bg-zinc-700'>
                    Зарегистрироваться
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    У вас уже есть аккаунт? <Link
                        to={'/login'}>
                        Войти в него
                    </Link>
                </Col>
            </Row>
        </FormContainer >
    )
}

export default RegisterScreen
