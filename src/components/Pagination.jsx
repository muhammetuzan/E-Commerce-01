import React, { useState, useEffect } from "react";

export default function Pagination({ total = 12, perPage = 4, onPageChange, currentPage = 1 }) {
  const [page, setPage] = useState(currentPage);
  const [inputPage, setInputPage] = useState("");
  const totalPages = Math.ceil(total / perPage);
  
  // currentPage prop değişince senkronize et
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);
  
  const handlePage = (p) => {
    if (p >= 1 && p <= totalPages) {
      setPage(p);
      onPageChange && onPageChange(p);
    }
  };

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleInputSubmit = (e) => {
    if (e.key === 'Enter') {
      const pageNum = parseInt(inputPage, 10);
      if (!isNaN(pageNum)) {
        handlePage(pageNum);
        setInputPage("");
      }
    }
  };
  
  // Sayfa numaralarını göster (current page etrafında 2-2 sayfa)
  const getPageNumbers = () => {
    const pages = [];
    const range = 2; // Current page etrafında kaç sayfa göster
    
    let start = Math.max(1, page - range);
    let end = Math.min(totalPages, page + range);
    
    // Başta çok sayfa yoksa sondan doldur
    if (start === 1 && end - start < 2 * range) {
      end = Math.min(totalPages, end + (2 * range - (end - start)));
    }
    // Sonda çok sayfa yoksa baştan doldur
    if (end === totalPages && end - start < 2 * range) {
      start = Math.max(1, start - (2 * range - (end - start)));
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8 px-4">
      {/* Üst kısım: First, Prev, Sayfa Kutucukları, Next, Last */}
      <div className="flex items-center justify-center gap-2 flex-wrap lg:flex-nowrap">
        {/* First Butonu */}
        <button
          onClick={() => handlePage(1)}
          disabled={page === 1}
          className="px-2 py-2 text-xs font-semibold bg-gray-200 text-gray-700 rounded-md disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:bg-gray-300 disabled:hover:bg-gray-200"
        >
          First
        </button>

        {/* Prev Butonu */}
        <button
          onClick={() => handlePage(page - 1)}
          disabled={page === 1}
          className="px-2 py-2 text-xs font-semibold bg-gray-200 text-gray-700 rounded-md disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:bg-gray-300 disabled:hover:bg-gray-200"
        >
          Prev
        </button>

        {/* 1-5 Sayfa Kutucukları */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => handlePage(num)}
              className={`w-7 h-7 rounded-md font-semibold text-xs transition-all duration-300 ${
                page === num
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Next Butonu */}
        <button
          onClick={() => handlePage(page + 1)}
          disabled={page === totalPages}
          className="px-2 py-2 text-xs font-semibold bg-gray-200 text-gray-700 rounded-md disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:bg-gray-300 disabled:hover:bg-gray-200"
        >
          Next
        </button>

        {/* Last Butonu */}
        <button
          onClick={() => handlePage(totalPages)}
          disabled={page === totalPages}
          className="px-2 py-2 text-xs font-semibold bg-gray-200 text-gray-700 rounded-md disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:bg-gray-300 disabled:hover:bg-gray-200"
        >
          Last
        </button>
      </div>

      {/* Alt kısım: Sayfa Göstergesi ve Input Kutucuğu */}
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sayfaya git:</span>
          <input
            type="number"
            value={inputPage}
            onChange={handleInputChange}
            onKeyPress={handleInputSubmit}
            placeholder="1"
            min="1"
            max={totalPages}
            className="w-20 px-3 py-1 text-sm border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <span className="text-sm font-semibold text-gray-700">
          {page} / {totalPages}
        </span>
      </div>
    </div>
  );
}
