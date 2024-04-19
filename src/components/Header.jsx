import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import { useNavigate } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style.esm";


if (typeof window !== 'undefined') {
    injectStyle();
}

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <div>
            <header>
                <Navbar className='bg-[image:var(--image-url)]'>
                    <Container>
                        <LinkContainer to='/'>
                            <Navbar.Brand href="/">Облако для всех</Navbar.Brand>
                        </LinkContainer>

                        <Navbar.Toggle aria-controls='basic-navbar-nav' />
                        <Navbar.Collapse id="basic-navbar-nav">

                            <Nav className="ml-auto">
                                {userInfo ? (

                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item><i className="fas fa-user pr-3 fa-3x"></i>Профиль</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/files'>
                                            <NavDropdown.Item><i className="fas fa-file pr-3 fa-3x"></i>Файлы</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={logoutHandler}><i className="fas fa-window-close pr-3 fa-3x"></i>Выход</NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <NavDropdown title='вход/регистрация' > 
                                        <LinkContainer to='/login'>
                                            <Nav.Link><i className="fas fa-user pr-3 fa-3x"></i>Вход</Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to='/register'>
                                            <Nav.Link><i className="fas fa-user-plus pr-2 fa-3x"></i>Регистрация</Nav.Link>
                                        </LinkContainer>
                                    </NavDropdown>
                                )}

                                {userInfo && userInfo.isAdmin && (
                                    <NavDropdown title='Панель администратора' id='adminmenue'>
                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item><i className="fas fa-users pr-3 fa-3x"></i>Все пользователи системы</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Divider />
                                    </NavDropdown>
                                )}
                            </Nav>

                        </Navbar.Collapse>

                    </Container>

                </Navbar>
                <ToastContainer
                    position='bottom-right'
                    theme='dark'
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    draggable
                    pauseOnHover
                    toastStyle={{ backgroundColor: '#343A40' }}
                />
            </header >
        </div>
    )
}

export default Header;
