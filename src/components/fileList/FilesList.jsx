import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListFiles } from '../../actions/filesActions';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Card from '../Card';
import Loader from '../Loader'
import Message from '../Message'
import add_plus from '../../assets/add_file.png';
import update_files from '../../assets/update_files.png';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Modal from '../modal/Modal';
import AddFile from '../AddFile';
import './fileList.css'


const FilesList = () => {

    // Модалка
    const [openModal, setOpenModal] = useState(false)
    // Пагинация 
    const [paginate, setPaginate] = useState(6);
    const [search, setSearch] = useState('');

    const history = useNavigate();

    // Получаем файлы
    const dispatch = useDispatch()

    const fileList = useSelector(state => state.fileLists)
    const { files, loading, error } = fileList

    

    const userLogin = useSelector(state => state.userLogin)
    const { loading: userLoading, userInfo } = userLogin
    useEffect(() => {
        if (userInfo) {
            dispatch(getListFiles());
        } else {
            history('/login')
        }
    }, [dispatch, history, userInfo])



    // фильтруем данные
    function searchDef(files) {
        return files.filter(
            (file) =>
                search.toLowerCase() === ''
                    ? file
                    : file.file_name.toLowerCase().includes(search) ||
                    file.file_type.toLowerCase().includes(search)
        );
    }
    // добавляем карточки на страницу
    const load_more = () => {
        setPaginate((prevValue) => prevValue + 6)
    }
    // Обновление списка файлов
    const updateFiles = ()=>{
        dispatch(getListFiles())
    }

    const sumFilesSize = files.reduce((summ, file) =>
    summ + (Number(file.size_file)), 0)
    
    // Перевод размера файлов
    function translateSizeFiles(value) {
        let fsize = ''
        const fsizekb = +value / 1024;
        const fsizemb = fsizekb / 1024;
        const fsizegb = fsizemb / 1024;
        const fsizetb = fsizegb / 1024;

        if (fsizekb <= 1024) {
            fsize = fsizekb.toFixed(2) + ' Кб';
        } else if (fsizekb >= 1024 && fsizemb <= 1024) {
            fsize = fsizemb.toFixed(2) + ' Мб';
        } else if (fsizemb >= 1024 && fsizegb <= 1024) {
            fsize = fsizegb.toFixed(2) + ' Гб';
        } else {
            fsize = fsizetb.toFixed(2) + ' Тб';
        }
        return fsize;
    }

    return (
        <>
            <Container className='container xs={12} md={6} lg={4} xl={3} mt-4'>
                <h2 className='my-6 text-center'>Список файлов</h2>
                    <div className='main-box-info'>
                        <h3>Общий объем файлов:</h3>
                        <div className='p-2 font-medium text-base shadow-md'>&nbsp;
                        {translateSizeFiles(sumFilesSize) }
                        </div>
                    </div>
                    <div className='main-box-info'>    
                        <h3>Количество файлов:</h3>
                        <div className='p-2 text-center font-medium text-base shadow-md'>&nbsp;
                            {files.length} шт.
                        </div>
                    </div>

                <div className='main-box'>

                    <Form className='form-box' >
                        <Form.Control
                            type='search'
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Введите название....'
                            className='h-17 bg-slate-200 rounded-sm ' />
                    </Form>
                    <Tippy content={<span>Добавить новый файл</span>}>
                        <button className="mx-2 text-white rounded-sm"
                            onClick={() => setOpenModal(true)}>
                            <img className='h-10 w-10 rounded-xl' src={add_plus} alt='Добавить файл' />
                        </button>
                    </Tippy>
                    <Tippy content={<span>Обновить список файлов</span>}>
                        <button className="mx-2 text-white rounded-sm"
                            onClick={updateFiles}>
                            <img className='h-10 w-10 rounded-xl' src={update_files} alt='Добавить файл' />
                        </button>
                    </Tippy>

                </div>

                {userLoading && loading
                    ? (<Loader />)
                    : error
                        ? (<Message variant='danger'>{error}</Message>)
                        : files?.length ? (
                            <div className=" container xs={12} md={6} lg={4} xl={3} mt-3">
                                <div className="CardGrid gap-4" >
                                    {
                                        searchDef(files)
                                            .slice(0, paginate)
                                            .map((file) => (
                                                <div key={file.id}>
                                                    <Card props={file} />
                                                </div>
                                            ))
                                    }
                                </div>
                                {files?.length > 10 &&
                                    <div className='box-btn'>
                                        <Button type='submit'
                                            variant='primary'
                                            className='bg-zinc-500 rounded-sm transform transition-all 
                                            hover:-translate-y-1 duration-300 shadow-lg
                                            hover:shadow-2xl'
                                            onClick={load_more}>Показать еще</Button>
                                    </div>
                                }
                            </div>
                        ) : (
                            <div className='textNotification'>
                                <h3 className='my-3  text-center'>Вы не загрузили ни один файл</h3>
                            </div>
                        )
                }
            </Container>
            <div>
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <AddFile />
                </Modal>
            </div>
        </>
    )
}
export default FilesList
