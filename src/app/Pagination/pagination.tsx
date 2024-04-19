
interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-2 px-4 py-2 bg-blue-500 text-white rounded-md ${currentPage === page ? 'bg-blue-600' : ''}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
