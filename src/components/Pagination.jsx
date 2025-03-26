import React, { useState, useEffect } from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [pageNumbers, setPageNumbers] = useState([]);
  
  useEffect(() => {
    // Function to determine which page numbers to show
    const calculatePageNumbers = () => {
      const maxPagesToShow = 5;
      let pages = [];
      
      if (totalPages <= maxPagesToShow) {
        // If total pages is less than or equal to max pages to show
        pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      } else {
        // Always show first page
        pages.push(1);
        
        // Calculate pages around current page
        const leftSide = Math.floor(maxPagesToShow / 2);
        const rightSide = maxPagesToShow - leftSide - 1;
        
        // If current page is close to start
        if (currentPage <= leftSide + 1) {
          for (let i = 2; i <= maxPagesToShow - 1; i++) {
            pages.push(i);
          }
          pages.push('...');
        } 
        // If current page is close to end
        else if (currentPage >= totalPages - rightSide) {
          pages.push('...');
          for (let i = totalPages - maxPagesToShow + 2; i < totalPages; i++) {
            pages.push(i);
          }
        } 
        // If current page is in the middle
        else {
          pages.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push('...');
        }
        
        // Always show last page
        pages.push(totalPages);
      }
      
      setPageNumbers(pages);
    };
    
    calculatePageNumbers();
  }, [totalPages, currentPage]);
  
  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage) {
      onPageChange(page);
    }
  };
  
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  return (
    <nav className={styles.pagination}>
      <button 
        className={`${styles.pageItem} ${styles.navButton} ${currentPage === 1 ? styles.disabled : ''}`}
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>
      
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          className={`${styles.pageItem} ${page === currentPage ? styles.active : ''} ${page === '...' ? styles.dots : ''}`}
          onClick={() => handlePageClick(page)}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}
      
      <button 
        className={`${styles.pageItem} ${styles.navButton} ${currentPage === totalPages ? styles.disabled : ''}`}
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </nav>
  );
};

export default Pagination;