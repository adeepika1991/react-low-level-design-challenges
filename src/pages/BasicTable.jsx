import { useState, useEffect, useMemo } from 'react';

const BasicTable = () => {
    const [ users, setUsers ] = useState([]);
    const [ sortColumn, setSortColumn ] = useState();
    const [ sortOrder, setSortOrder ] = useState('asc');
    // const [ currentPage, setCurrentPage ] = useState(1);
    // const [ recordsPerPage, setRecordsPerPage ] = useState(5);
    // paginatedUsers would be 0 to 4 => if rpp is 5, 0 to 6 if rpp is 6, 0 to 9 if rpp is 10
    
    useEffect(() => {
        const fetchUsers = async() => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUsers();
    }, [])

    const sortedUsers = useMemo(() => {
        if(!sortColumn) return [...users];
        return [...users].sort((a,b) => {
            const valueA = a[sortColumn];
            const valueB = b[sortColumn];

            if(typeof valueA === 'string') {
                return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueB);
            } else {
                return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
            }
        })

    }, [users, sortColumn, sortOrder]);

    const handleDelete = (id) => {
        const deletedUsers = users?.filter((user) => {
            return user.id !== id;
        })
        setUsers(deletedUsers);
    }

    const handleSort = (column) => {
        const newOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        setSortColumn(column);
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 text-gray-800">
            <div className="text-4xl font-bold">Basic Table</div>
            <table className="w-[600px] border border-gray-300 text-center">
                <thead className='bg-gray-200'>
                    <tr>
                        <th className='border p-2 text-center' onClick={() => handleSort('id')}>ID {sortColumn === 'id' ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}</th>
                        <th className='border p-2 text-center' onClick={() => handleSort('name')}>Name {sortColumn === 'name' ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}</th>
                        <th className='border p-2 text-center' onClick={() => handleSort('username')}>User Name {sortColumn === 'username' ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}</th>
                        <th className='border p-2 text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers?.map(({id, name, username}) => {
                        return <tr key={id}>
                            <td className='border p-2 text-center'>{id}</td>
                            <td className='border p-2 text-center'>{name}</td>
                            <td className='border p-2 text-center'>{username}</td>
                            <td className='border p-2 text-center'>
                                <button onClick={() => handleDelete(id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <hr className="border-1 border-black w-3/4 my-2" />
            <div>
                
            </div>
    </div>
  )
}

export default BasicTable