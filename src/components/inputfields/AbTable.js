import React, { useState } from 'react';
import AbPagination from './AbPagination';
import AbDateFormat from './AbDateFormat';

const AbTable = ({ data, columns, icon, clickOnIcon }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6;
    const totalPages = Math.ceil(data.length / rowsPerPage);

    const handleClickPage = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentRows = data.slice(startIndex, endIndex);

    return (
        <div className="tw-bg-whitee tw-w-full tw-rounded-xl tw-py-3 tw-px-2 sm:tw-px-10 tw-overflow-x-auto">
            <table className='tw-w-full'>
                <thead className='tw-border-b tw-border-icon'>
                    <tr>
                        {columns.map((column, index) => (
                            <td
                                key={index}
                                className={`tw-font-[1000] tw-py-6 tw-px-3`}
                            >
                                {column.label}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody className={currentRows.length > 2 ? 'tw-overflow-y-auto' : ''}>
                    {currentRows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={rowIndex === currentRows.length - 1 ? '' : 'tw-border-b tw-border-icon'}
                        >
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className='tw-py-5 tw-text-sm tw-font-bold tw-text-blackk tw-px-3'
                                >
                                    {column.key === 'created_at' ? AbDateFormat(row[column.key]) : row[column.key] || 'Not Available'}  
                                </td>
                            ))}
                            {icon && (
                                <td className='tw-cursor-pointer' onClick={()=> clickOnIcon(row.id)}> {icon} </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {totalPages > 1 && (
                <div className='tw-my-5'>
                    <AbPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handleClickPage}
                    />
                </div>
            )}
        </div>
    );
};

export default AbTable;
