// Pagination.js
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Function to generate an array of page numbers to display
  const getPageNumbers = (): number[] => {
    const pagesToShow = 3; // Number of pages to show directly
    const pageNumbers: number[] = [];
    
    // If there are fewer total pages than the number of pages to show directly,
    // display all pages
    if (totalPages <= pagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // If current page is within the first pagesToShow pages
      if (currentPage <= pagesToShow) {
        for (let i = 1; i <= pagesToShow; i++) {
          pageNumbers.push(i);
        }
      } else {
        // If current page is within the last pagesToShow pages
        if (currentPage + (pagesToShow - 1) >= totalPages) {
          for (let i = totalPages - (pagesToShow - 1); i <= totalPages; i++) {
            pageNumbers.push(i);
          }
        } else {
          // Otherwise, display the current page and the next two pages
          for (let i = currentPage; i <= currentPage + (pagesToShow - 1); i++) {
            pageNumbers.push(i);
          }
        }
      }
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-4">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)} className="mx-2 px-4 py-2 bg-gray-700 text-white rounded-md">
          Prev
        </button>
      )}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-2 px-4 py-2 bg-gray-700 text-white rounded-md ${currentPage === page ? 'bg-gray-700' : ''}`}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)} className="mx-2 px-4 py-2 bg-gray-700 text-white rounded-md">
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
