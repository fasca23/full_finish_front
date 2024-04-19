import React, { useRef, useState } from 'react';
import { Form, Button, InputGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addFileList } from '../actions/filesActions';
import { ImUpload } from 'react-icons/im';
import { getListFiles } from '../actions/filesActions';
import { toast } from 'react-toastify';

const AddFile = () => {

    //Для быстрого переноса мышкой файлов
    const wrapperRef = useRef(null);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // храним состояние от пользователя
    const [file_file, setFile] = useState(null)
    const [file_name, setFileName] = useState('')
    const [description, setDescription] = useState('')
    const [size_file, setSizeFile] = useState('')
    const [create_at, setCreate] = useState('')
    const [settypeOfFile] = useState('')

    const nameRef = useRef('');

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // очистка формы
    const clearData = () => {
        setFile(null);
        setSizeFile("");
        setCreate("");
        setFileName("");
        settypeOfFile("");
    }

    const fileSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        let file_type = String(file_file.name.split('.')[1])
        let file_name = String(file_file.name.split('.')[0])
        formData.append('file_file', file_file, file_file.name)
        formData.append('file_name', file_name)
        formData.append('description', description)
        formData.append('size_file', size_file)
        formData.append('create_at', create_at)
        formData.append('user_id', userInfo.id)
        formData.append('file_type', file_type)
        dispatch(addFileList(formData))
        clearData();
        navigate('/files');
        dispatch(getListFiles())
        toast.success('Файл успешно добавлен')
    }
    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        setSizeFile(nameRef.current.files[0].size)
        let nameOfFile = newFile.name
        let typeOfFile = String(newFile.name.split('.')[1])
        setCreate(new Date().toISOString())
        if (newFile) {
            setFile(newFile)
            setFileName(nameOfFile)
            settypeOfFile(typeOfFile)
        }
    }

    return (
        <Container>
            <h2 className="my-6 text-center">Загрузить файл</h2>
            <div className='flex justify-center align-middle'>
                <Form className='p-3 bg-white rounded-xl transform transition-all duration-300 shadow-lg'
                    onSubmit={fileSubmitHandler}>
                    <div className='flex gap-4'>
                        <div ref={wrapperRef}
                            className="flex justify-center items-center drop-file-input"
                            onDragEnter={onDragEnter}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}>
                            <div className="grid grid-row-3 gap-4 justify-items-center  drop-file-input__label">
                                <ImUpload size='100px' color='red' />
                                <p>Перенесите мышкой свои файлы</p>
                                <p>(или нажмите)</p>
                            </div>
                            <input
                                ref={nameRef}
                                type="file"
                                defaultValue={file_file}
                                required
                                onChange={onFileDrop} />
                        </div>
                        <div className="grid justify-center items-center">
                            <Form.Control className='rounded-xl text-sm text-slate-900 font-bold text-center'
                                type="text"
                                placeholder="Название файла"
                                defaultValue={file_name}
                                readOnly={true}
                            />

                            <InputGroup className="rounded-xl ">
                                <Form.Control className='rounded-xl  text-slate-900 font-bold text-center'
                                    placeholder="размер"
                                    type="text"
                                    defaultValue={size_file}
                                    readOnly={true}
                                />
                                <InputGroup.Text className=' text-white rounded-xl bg-gray-600'>байты</InputGroup.Text>
                            </InputGroup>
                            <InputGroup>
                                <Form.Control className='rounded-xl  text-slate-900 font-bold text-center'
                                    type="text"
                                    placeholder="Дата создания"
                                    defaultValue={create_at}
                                    readOnly={true}
                                />
                            </InputGroup>
                        </div>
                    </div>
                    <Form.Group>
                        <Form.Control as='textarea' row={3}
                            className="my-3 rounded-xl"
                            type="text"
                            required
                            placeholder="Описание"
                            defaultValue={description}
                            onChange={(e) =>
                                setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <div className="my-3 flex justify-end items-center">
                        <Button className="text-white bg-gray-600 px-3 py-1 rounded-xl 
                        text-decoration-none hover:bg-red-700 " size='x2' type='submit'>Сохранить</Button>
                    </div>
                </Form>
            </div>
        </Container>
    )
}

export default AddFile;
