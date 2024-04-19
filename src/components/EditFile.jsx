import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TbArrowBackUp } from 'react-icons/tb';
import { Form, Button, InputGroup, Container } from 'react-bootstrap';
import FormContainer from './FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailFile, updateFile } from '../actions/filesActions';
import ScreenFile from '../assets/file-blank-solid-240.png';
import { variables } from './../utils/variables';
import { toast } from 'react-toastify';

function EditFile() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fileDetail = useSelector(state => state.detailFile);
    const { file } = fileDetail;

    const [description, setDescription] = useState('')
    const [file_name, setName] = useState('')

    // очистка
    const clearData = () => {
        setDescription("");
    }

    useEffect(() => {
        dispatch(getDetailFile(id));
        setDescription(file.description);
        setName(file.file_name);
    }, [id, dispatch])

    const fileUpdateSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        let create_at = new Date().toISOString()
        formData.append('description', description)
        formData.append('create_at', create_at)
        formData.append('file_name', file_name)
        dispatch(updateFile(id, formData));
        toast.success('Файл успешно обновлен')
        clearData();
        navigate('/files');
    }

    function date_download() {
       const date = file.last_download_time
       if (!date) {
            return 'ни разу не скачали'
       }
       return new Date(date).toLocaleString('ru')
    }

    return (
        <div>
            <Container>
                <h2 className='my-6 text-center'>Просмотр и Изменение файла</h2>
                <div className="m-2 flex justify-between items-cente">
                    <Link to='/files' className="flex justify-center items-center text-decoration-none ">
                        <TbArrowBackUp className="mr-1 " />
                        Вернуться
                    </Link>
                </div>
                {
                    file && (
                        <FormContainer >
                            <Form className='w-100 p-3 bg-white rounded-xl transform 
                    transition-all duration-300 shadow-lg'
                                onSubmit={fileUpdateSubmit}>
                                <div className='flex gap-4'>
                                    <div>
                                        {
                                            variables.format_files.includes(file.file_type) ?
                                                (
                                                    <a href={`${variables.STATIC_URL}${file.file_file}`} target='_blank' rel="noopener noreferrer">
                                                        <img className="h-80 w-60 object-cover object-center rounded-xl " alt='картинка'
                                                            src={`${variables.STATIC_URL}${file.file_file}`} />
                                                    </a>
                                                ) : (
                                                    <img className="h-40 w-40 object-cover object-center rounded-xl" alt='картинка'
                                                        src={`${ScreenFile}`} />
                                                )
                                        }
                                    </div>
                                    <div className="grid justify-center items-center">
                                        <label className="block">
                                            <span className='block text-sm font-medium text-slate-700'>Название файла</span>
                                            <Form.Control className='rounded-xl hover:bg-red-200 text-sm text-slate-500 font-bold text-left focus:ring focus:ring-inherit'
                                                type="text"
                                                placeholder="name of file"
                                                defaultValue={file.file_name}
                                                onChange={(e) =>
                                                    setName(e.target.value)}
    
                                                // readOnly={true} 
                                                />
                                        </label>
                                        <InputGroup className="rounded-xl p-0">
                                            <label className="block">
                                                <span className='block text-sm font-medium text-slate-700'>Размер файла</span>
                                                <Form.Control className=' static rounded-xl text-sm text-slate-500 font-bold text-left'
                                                    placeholder="size"
                                                    type="text"
                                                    defaultValue={file.size_file}
                                                    readOnly={true}
                                                />
                                            </label>
                                            <div className='absolute p-2  top-6 right-1 rounded-r-lg bg-green-700 text-white text-cente'>byte</div>
                                        </InputGroup>
                                        <InputGroup>
                                            <label className="block">
                                                <span className='block text-sm font-medium text-slate-700'>Дата загрузки/изменения</span>
                                                <Form.Control className='rounded-xl text-sm text-slate-500 font-bold text-left'
                                                    type="text"
                                                    placeholder="Дата загрузки"
                                                    defaultValue={new Date(file.create_at).toLocaleString('ru')}
                                                    readOnly={true}
                                                />
                                            </label>
                                        </InputGroup>
                                        <InputGroup>
                                            <label className="block">
                                                <span className='block text-sm font-medium text-slate-700'>Дата последнего скачивания</span>
                                                <Form.Control className='rounded-xl text-sm text-slate-500 font-bold text-left'
                                                    type="text"
                                                    placeholder="Дата загрузки"
                                                    defaultValue={date_download()}
                                                    readOnly={true}
                                                />
                                            </label>
                                        </InputGroup>

                                    </div>
                                </div>
                                <Form.Group>
                                    <label className="block">
                                        <span className='block md-2 text-sm font-medium text-slate-700'>Описание</span>
                                        <Form.Control as='textarea' row={3}
                                            className="rounded-xl hover:bg-red-200 border-size-2 focus:ring focus:ring-inherit"
                                            type="text"
                                            required
                                            placeholder="Описание"
                                            defaultValue={file.description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)}
                                        />
                                    </label>
                                </Form.Group>

                                <div className="mb-3 flex justify-end items-center">
                                    <Button className="text-white bg-violet-600 px-3 py-1 rounded-xl 
                        text-decoration-none hover:bg-red-700 " size='xl' type='submit'>Сохранить изменения</Button>
                                </div>
                            </Form>
                        </FormContainer>
                    )
                }
            </Container>
        </div>
    )
}

export default EditFile
