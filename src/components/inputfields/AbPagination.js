import React from 'react';

const AbPagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (pageNumber) => {
        onPageChange(pageNumber);
    };

    return (
        <div className="tw-flex tw-justify-between tw-items-center">
            <button
                className='tw-bg-primary tw-p-2 tw-rounded-xl tw-text-whitee tw-font-bold'
                onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {/* Page number */}
            <span className='tw-font-bold'>
                {currentPage} / {totalPages}
            </span>

            {/* Next button */}
            <button
                className='tw-bg-primary tw-p-2 tw-rounded-xl tw-text-whitee tw-font-bold'
                onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default AbPagination;
