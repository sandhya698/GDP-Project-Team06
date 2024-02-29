import React from 'react'
import { FaSync } from "react-icons/fa";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationListStandalone, PaginationProvider } from "react-bootstrap-table2-paginator";
import { Button } from 'react-bootstrap';

export default function ReactTable({refreshTable, pageSize, data, columns}) {
  const paginationOptions = {
    custom: true,
    sizePerPage: pageSize,
    totalSize: data.length
  };

  return (
    <>
        <div style={{ color: '#4682B4' }} className='overflow-auto'>
          <PaginationProvider pagination={paginationFactory(paginationOptions)} >
            {
              ({ paginationProps, paginationTableProps }) => (
                <div>
                  <div className='d-flex justify-content-between align-items-center'>
                    <Button className='mb-2' variant="outline-primary" title='refresh table' size='sm' onClick={refreshTable} ><FaSync /></Button> 
                    <PaginationListStandalone {...paginationProps} />
                  </div>
                  
                  <BootstrapTable
                    keyField="_id"
                    data={data}
                    columns={columns}
                    {...paginationTableProps}
                    hover
                    noDataIndication="There is nothing to show here"
                  />
                </div>
              )
            }
          </PaginationProvider>
        </div>
        <p className="m-0"> <span style={{ fontWeight: 'bold', color: 'red'}}>Note:</span>  You can sort by Name and Status</p>
    </>
  )
}
