import React from 'react';
import { useTable, TableOptions } from 'react-table';

import styles from './Table.module.sass';

const Table: React.FC = () => {
  return <div />;
  //   const data = React.useMemo(
  //     () => [
  //       {
  //         col1: 'Hello',
  //         col2: 'World',
  //       },
  //       {
  //         col1: 'react-table',
  //         col2: 'rocks',
  //       },
  //       {
  //         col1: 'whatever',
  //         col2: 'you want',
  //       },
  //     ],
  //     [],
  //   );
  //   const columns = React.useMemo(
  //     () => [
  //       {
  //         Header: 'Id',
  //         accessor: 'col1',
  //       },
  //       {
  //         Header: 'Autor',
  //         accessor: 'col2',
  //       },
  //       {
  //         Header: 'Data publicação',
  //         accessor: 'col2',
  //       },
  //       {
  //         Header: 'Tags',
  //         accessor: 'col2',
  //       },
  //       {
  //         Header: 'Likes',
  //         accessor: 'col2',
  //       },
  //       {
  //         Header: 'Conteúdo',
  //         accessor: 'col2',
  //       },
  //       {
  //         Header: 'Editar',
  //         accessor: 'col2',
  //       },
  //       {
  //         Header: 'Ativo',
  //         accessor: 'col2',
  //       },
  //     ],
  //     [],
  //   );
  //   const tableInstance = useTable({ columns, data });
  //   const {
  //     getTableProps,
  //     getTableBodyProps,
  //     headerGroups,
  //     rows,
  //     prepareRow,
  //   } = tableInstance;
  //   return (
  //     <table {...getTableProps()}>
  //       <thead>
  //         {headerGroups.map(headerGroup => (
  //           <tr {...headerGroup.getHeaderGroupProps()}>
  //             {headerGroup.headers.map(column => (
  //               <th {...column.getHeaderProps()}>{column.render('Header')}</th>
  //             ))}
  //           </tr>
  //         ))}
  //       </thead>
  //       <tbody {...getTableBodyProps()}>
  //         {rows.map(row => {
  //           prepareRow(row);
  //           return (
  //             <tr {...row.getRowProps()}>
  //               {row.cells.map(cell => {
  //                 return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
  //               })}
  //             </tr>
  //           );
  //         })}
  //       </tbody>
  //     </table>
  //   );
};

export default Table;
