import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { variables } from './../utils/variables';


function DownloadFile() {
    const [download, setDownlod] = useState(false);

    const params = useParams();
    const id = params.id
    const downloadFile = (id) => {
        const linkP = document.createElement('p');
        const link = document.createElement('a');
        link.href = `${variables.API_URL}files/downloadshare/${id}`;
        const fileName = linkP.textContent
        link.setAttribute('download', `${fileName}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
        setDownlod(true);
    }

    if (download) {
        console.log("Файл загружен")
    } else {
        downloadFile(id)
    }

    return (
        <>
            {download ? (
                <div className='flex justify-center text-center'><h2>Файл загружен</h2></div>
            ) : (<div className='flex justify-center text-center'><h2>Такого файла нет....</h2></div>)

            }
        </>
    )
}

export default DownloadFile