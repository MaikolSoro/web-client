import React from "react";
import { Pagination as PaginationAntd } from "antd";

import "./Pagination.scss";

/*-----------------------------*/
/* Pagination es donde el usuario va navegar y las diferentes paginas para mostar más pots*/
/*-----------------------------*/
export default function Pagination(props) {
  const { posts, location, history } = props;
  const currentPage = parseInt(posts.page);

  /*-----------------------------*/
  /* Refrescar los datos de la  lista de post y no recarga la pagina , cuando navega a otra paginas */
  /*-----------------------------*/
  const onChangePage = newPage => {
    history.push(`${location.pathname}?page=${newPage}`);
  };

  return (
    <PaginationAntd
      defaultCurrent={currentPage}
      total={posts.total}
      pageSize={posts.limit}
      onChange={newPage => onChangePage(newPage)}
      className="pagination"
    />
  );
}