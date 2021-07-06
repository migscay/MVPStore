import React from 'react';
import { Menu } from 'semantic-ui-react'


const Pagination = ({ pages, currentPage, paginate }) => {
  
  return (
      <nav className="d-flex justify-content-center">
          <ul className="pagination">
              {pages.map((page) => (
                <li className={page === currentPage ? "page-item active" : "page-item"}>
                    <p className="page-link" onClick={() => paginate(page)}>{page}</p>    
                </li> 
              ))}
          </ul>
      </nav>
  );
};

export default Pagination;
