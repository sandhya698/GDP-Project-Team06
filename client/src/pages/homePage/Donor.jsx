import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { donorsListRoute } from '../../utils/ApiRoutes';
import { donorColumns } from '../../utils/tableHeaders/donorHeaders';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import { Container } from 'react-bootstrap';

export const Donor = () => {

  const navigate = useNavigate();
  const [donorList, setDonorList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDonors = useCallback ( async () => {
    try {
      const res = await axios.get(donorsListRoute, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.data.success) {
        setDonorList(res.data.donors);
        setLoading(false);
        console.log(res.data.donors);
      }
    }
    catch (err) {
      console.log(err.response);
      setLoading(false);
      if (!err.response.data.success) {
        navigate('/error');
      }
    }
  }, [navigate])

  useEffect(() => {
    getDonors();
  }, [getDonors, navigate]);

  return (
    <>
      {
        loading ? (
          <LoadingSpinner />
        ) :
          (
            <Container className='h-100 px-5 d-flex flex-column'>
              <div style={{ color: "#4682B4" }}>
                <BootstrapTable
                  keyField="_id"
                  data={donorList}
                  columns={donorColumns}
                  pagination={paginationFactory()}
                />
              </div>
            </Container>
        )
      }
    </>
  )
}
