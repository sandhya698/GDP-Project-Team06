import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { donationReqHeaders } from '../utils/tableHeaders/donationsReqHeaders';
import axios from 'axios';
import { adminControllerRoute, donationsListRoute } from '../utils/ApiRoutes';
import { Button, Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import ReactTable from '../components/ReactTable';
import { refreshToastOptions, toastOptions } from '../utils/toasOptions';
import { toast } from 'react-toastify';

export const Donations = () => {

  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState(donationReqHeaders);

  const api = axios.create({
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const getDonations = useCallback ( async () => {
    try {
      const res = await api.get(donationsListRoute);

      if (res.data.success) {
        setDonations(res.data.donationsList);
      }
    }
    catch (err) {
      console.log(err.response);
      if (!err.response.data.success) {
        navigate('/error');
      }
    }
    finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    // eslint-disable-next-line
  }, [navigate])

  useEffect(() => {
    getDonations();
  }, [getDonations]);

  const updateStatus = async (id, bloodGroup, quantity, status) => {
    try {
      let newStatus = status === 'rejected' ? 'accepted' : 'rejected';
      let route = `${adminControllerRoute}/donor/donate/${newStatus}`;
      const res = await api.post(route, {
        id, quantity, bloodGroup
      });
      if (res.data.success === true) {
        setDonations((prevDonorList) => {
          return prevDonorList.map((donation) => {
            if (donation._id === id) {
              return { ...donation, status: newStatus };
            }
            return donation;
          });
        });
      };
    }
    catch (error) {
      // console.log(error.response.data);
      toast.error(error.response.data.message, toastOptions);
    }
  }

  useEffect(() => {
    setColumns([...donationReqHeaders,{
      dataField: "Actions",
      isDummyField: true,
      text: "Actions",
      headerStyle: {
        backgroundColor: "#DEDADA",
        width: '10rem'
      },
      formatter: (cell, row) => {
        return (  <>
          <Button
            onClick={() => updateStatus(row._id, row.bloodGroup, row.quantity, row.status)}
            variant={row.status === 'rejected' ? 'success' : 'danger'}
            size="sm">
            {row.status === 'rejected' ? 'Accept' : 'Reject'}
          </Button>
          <Button
            className='ms-3'
            onClick={() => updateStatus(row._id, row.bloodGroup, row.quantity, row.status)}
            variant={row.status === 'pending' ? 'success' : null}
            size="sm">
            {row.status === 'pending' ? 'Accept' : null}
          </Button>
        </>
      )}
    }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donationReqHeaders]);

  const refreshTable = () => {
    getDonations();
    toast.success('donations history refreshed', refreshToastOptions);
  }

  return (
    <>
      { loading ? (
        <LoadingSpinner />
      ) : (
        <Container className='p-5 d-flex flex-column ' style={{ height: '100vh', overflowY: 'auto' }} >
          <Row>
            <h3 className="text-left fs-1 mb-3 text-capitalize">Donations made so far...</h3>
          </Row>
          <Row>
            <ReactTable
              pageSize={8}
              data={donations}
              columns={columns}
              refreshTable={refreshTable}
            />
          </Row>
        </Container>  
      )}
    </>
  )
}
