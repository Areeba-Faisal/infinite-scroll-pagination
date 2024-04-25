import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = (): number[] => {
    const pagesToShow = 3; 
    const pageNumbers: number[] = [];

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
        if (currentPage + (pagesToShow - 1) >= totalPages) {
          for (let i = totalPages - (pagesToShow - 1); i <= totalPages; i++) {
            pageNumbers.push(i);
          }
        } else {
          for (let i = currentPage; i <= currentPage + (pagesToShow - 1); i++) {
            pageNumbers.push(i);
          }
        }
      }
    }
    return pageNumbers;
  };

  return (
    <div  style={{
      display:"flex",
      justifyContent:"center",
      marginTop:"1rem",
    }} >
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)} style={
          {
            marginLeft: "0.5rem",
            marginRight: "0.5rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            backgroundColor: "#2d3748",
            color: "white",
            borderRadius: "0.375rem"
          }}>
          Prev
        </button>
      )}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={
            {
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              backgroundColor: "#2d3748",
              color: "white",
              borderRadius: "0.375rem"
            }}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}
          style={
            {
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              backgroundColor: "#2d3748",
              color: "white",
              borderRadius: "0.375rem"
            }}>
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
