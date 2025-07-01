import "../assets/pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <div className="pagination-info">
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-button prev"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀ PREV
        </button>

        <div className="pagination-numbers">
          {visiblePages.map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className="pagination-ellipsis">...</span>
              ) : (
                <button
                  className={`pagination-number ${currentPage === page ? "active" : ""}`}
                  onClick={() => onPageChange(page as number)}
                >
                  {page}
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          className="pagination-button next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          NEXT ▶
        </button>
      </div>
    </div>
  );
}
