import React, { useMemo, useState } from 'react';
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table'
import './tableFiles.css'
import { COLUMNS } from './columns'
import { GlobalFilter } from './FilterFiles'

import axios from 'axios';
import { variables } from '../../utils/variables';
import { useSelector } from 'react-redux';
import delete_file from '../../assets/delete.png';
import download_file from '../../assets/download.png';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


function PersonalFiles({ files }) {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // const dispatch = useDispatch()
  const [date, setValue] = useState();


  const columns = useMemo(() => COLUMNS, [])
  const data = files

  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination)

  const { pageIndex, globalFilter } = state

    // функция Удаления файла с диска
  async function deleteDownloadFileAtURL(element_td) {
      const fileRole = element_td.target.role
        if (fileRole!=='cell') {
          const fileAlt = element_td.target.alt
          if (fileAlt==='Удалить') {
            const file_id = element_td.target.parentNode.parentNode.cells[0].innerHTML
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
            .catch((err) => console.log(err))
            setValue({});
            const removeETr = element_td.target.parentNode.parentNode
            removeETr.remove()
          }
        }
        if (fileAlt==='Скачать') {
          const file_id = element_td.target.parentNode.parentNode.cells[0].innerHTML
          const file_name = element_td.target.parentNode.parentNode.cells[1].innerHTML
          const file_type = element_td.target.parentNode.parentNode.cells[2].innerHTML
          downloadFileAtURL(file_id, `${file_name}.${file_type}`)
        }
      }
  }
  
// Скачивание файла пользователя
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


  return (

    <div className='main-container'>
      <h1 className='text-center'>Файлы пользователя</h1>

      <div className='wrapper'>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

        <table {...getTableProps()}>
          <thead className=' bg-blue-100 px-15' >
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Заголовок")}
                    <span>
                      {column.isSorted ? column.isSortedDesc ? '↧' : '↥' : ''}
                    </span>
                  </th>
                ))}
                <th>Скачать</th>
                <th>Удалить</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} onClick={(e) => deleteDownloadFileAtURL(e)}>
                  {row.cells.map((cell) => (
                    
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                    <Tippy content={<span>Скачать файл</span>}>
                      <td><img className='h-12 w-12 text-center' src={download_file} alt='Скачать'/></td>
                      </Tippy>
                    <Tippy content={<span>Удалить файл</span>}>
                      <td><img className='h-12 w-12 text-center' src={delete_file} alt='Удалить'/></td>
                      </Tippy>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className='text-center'>
          <button className='btn' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'↤↤'}
          </button>{' '}
          <button className='btn' onClick={() => previousPage()} disabled={!canPreviousPage}>
            Предыдущие
          </button>{' '}
          <button className='btn' onClick={() => nextPage()} disabled={!canNextPage}>
            Следующие
          </button>{' '}
          <button className='btn' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'↦↦'}
          </button>{' '}
          <span>
            Страница{' '}
            <strong className='btn'>
              {pageIndex + 1} из {pageOptions.length}
            </strong>{' '}
          </span>

        </div>
      </div>
    </div>
  )
}

export default PersonalFiles
