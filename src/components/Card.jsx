import React from 'react'
import ScreenFile from '../assets/file-blank-solid-240.png';
import edit_file from '../assets/edit.png';
import download_file from '../assets/download.png';
import delete_file from '../assets/delete.png';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { variables } from '../utils/variables';
import { useClipboard } from 'use-clipboard-copy';
import { getListFiles } from '../actions/filesActions';


function Card({ props }) {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const clipboard = useClipboard({
        copiedTimeout: 4000, // продолжительность времени в миллисекундах
    });

    const dispatch = useDispatch()

    // Отрезать строку имени файла
    let newNameFile = props.file_name.slice(0, 25)
    if (newNameFile.length < props.file_name.length) {
        newNameFile += '...';
    }

    let newNameDescription = props.description.slice(0, 15)
    if (newNameDescription.length < props.description.length) {
        newNameDescription += '...';
    }

    // используя тип BLOB, создаем ссылку для скачивания 
    const forceDownload = (response, fileName) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    }
    // функция загрузки файла на диск
    async function downloadFileAtURL(file_id, fileName) {
        await axios.get(
            `${variables.API_URL}files/download/${file_id}`,
            {
                responseType: 'blob',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Fasca ${userInfo.token}`,
                }
            },
        ).then((data) => {
            forceDownload(data, fileName)
        })
    }

    // функция Удаления файла с диска
    async function deleteFileAtURL(file_id) {
        if (window.confirm('Вы уверены, что хотите удалить этот файл?')) {
            await axios.delete(
            `${variables.API_URL}files/delete/${file_id}`,
            {
                responseType: 'blob',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Fasca ${userInfo.token}`,
                }
            },
        )
        dispatch(getListFiles())
    }}    

    return (
        <div>
            <div className='w-30 p-2 bg-white rounded-xl transform transition-all 
            hover:-translate-y-1 duration-300 shadow-lg
            hover:shadow-2xl'>
                    <div className='static flex justify-start items-center'>
                        <Tippy content={<span>{newNameFile}</span>}>
                            {variables.format_files.includes(props.file_type) ?
                                    (
                                        <img className="h-30 w-30 object-cover object-center rounded-xl" alt='Картинка'
                                            src={`${variables.STATIC_URL}${props.file_file}`} />
                                    ) : (
                                        <img className="h-30 w-30 object-cover object-center rounded-xl" alt='Картинка'
                                            src={`${ScreenFile}`} />
                                    )
                            }
                        </Tippy>
                        <div className="p-2 absolute top-0 right-0 
                            font-medium rounded-tr-xl bg-[#9370DB] text-white text-center">
                            {props.file_type}
                        </div>
                    </div>
                    <Tippy content={<span>{props.description}</span>}>

                        <div className='p-2'>
                            <h2 className='text-xs text-left font-normal'>{newNameDescription}</h2>
                        </div>
                    </Tippy>
                <div className='flex justify-center items-center gap-2'>
                    <Tippy content={<span>Изменить файл</span>}>
                        <Link to={'/update/' + props.id}>
                            <img className='h-10 w-10 rounded-xl' src={edit_file} alt='Изменить файл' />
                        </Link>
                    </Tippy>
                    <Tippy content={<span>Скачать файл</span>}>
                        <button onClick={() => {
                            downloadFileAtURL(
                                `${props.id}`,
                                `${props.file_name}.${props.file_type}`)
                        }}>
                            <img className='h-10 w-10 rounded-xl'
                                src={download_file}
                                alt='Скачать файл' />
                        </button>
                    </Tippy>
                    <Tippy content={<span>Удалить файл</span>}>
                        <button onClick={() => {
                            deleteFileAtURL(
                                `${props.id}`)
                        }}>
                            <img className='h-10 w-10 rounded-xl'
                                src={delete_file}
                                alt='Удалить файл'/>
                        </button>
                    </Tippy>

                </div>
                <div className='text-center text-base mt-2 '>
                    <input ref={clipboard.target}
                        value={`${variables.API_URL_FRONT}files/download/${props.id_uuid}`}
                        type="hidden" readOnly />
                    <button className=" pl-3 pr-3 bg-[#686868] text-white rounded-sm hover:bg-fuchsia-600"
                        onClick={clipboard.copy}>
                        {clipboard.copied ? 'Ссылка скопирована' : 'Скопировать ссылку'}
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Card
