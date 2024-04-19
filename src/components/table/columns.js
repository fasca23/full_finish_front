import { format } from 'date-fns'

export const COLUMNS = [
    {
        Заголовок: 'ID_',
        accessor: 'id',
    },
    {
        Заголовок: 'Название',
        accessor: 'file_name',
    },
    {
        Заголовок: 'Разрешение',
        accessor: 'file_type',
    },
    {
        Заголовок: 'Описание',
        accessor: 'description',
    },
    {
        Заголовок: 'Дата загрузки',
        accessor: 'create_at',
        Cell: ({ value }) => { return format(new Date(value), 'HH:mm:ss dd-MM-yyyy') }
    },
    {
        Заголовок: 'Дата скачивания',
        accessor: 'last_download_time',
        Cell: ({ value }) => { 
            if (!value) {
                return 'ни разу'
            }else{return format(new Date(value), 'HH:mm:ss dd-MM-yyyy ')}   
        }
    },
    {
        Заголовок: 'Размер',
        accessor: 'size_file',
        Cell: ({ value }) => {
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
    },
]