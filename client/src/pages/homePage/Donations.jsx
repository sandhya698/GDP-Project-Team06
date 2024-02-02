import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { donationReqHeaders } from '../../utils/tableHeaders/donationsReqHeaders';
import axios from 'axios';
import { adminControllerRoute, donationsListRoute } from '../../utils/ApiRoutes';
import { Button, Container } from 'react-bootstrap';
import LoadingSpinner from '../../components/LoadingSpinner';
import ReactTable from '../../components/ReactTable';
import { toastOptions } from '../../utils/toasOptions';
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
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [navigate])

  useEffect(() => {
    getDonations();
  }, [getDonations, navigate]);

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
        width: '10%'
      },
      formatter: (cell, row) => {
        return (  <>
          <Button
            onClick={() => updateStatus(row._id, row.bloodGroup, row.quantity, row.status)}
            variant={row.status === 'rejected' ? 'success' : 'danger'}
            size="sm">
            {row.status === 'rejected' ? 'Accept' : 'Reject'}
          </Button>
        </>
      )}
    }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="h-100">
      {
        loading ? (
          <LoadingSpinner />
        ) : (
          <ReactTable
              title={'Donations made so far...'}
              pageSize={8}
              data={donations}
              columns={columns}
            />
        )
      }
    </Container>
  )
}
