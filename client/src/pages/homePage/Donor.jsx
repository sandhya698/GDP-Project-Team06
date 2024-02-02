import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { donorsListRoute, userStatusUpdateRoute } from '../../utils/ApiRoutes';
import { Button, Container } from 'react-bootstrap';
import ReactTable from '../../components/ReactTable';
import { donorPatientHeaders } from '../../utils/tableHeaders/donorPatinetHeaders';
import { toast } from 'react-toastify';
import { toastOptions } from '../../utils/toasOptions';

export const Donor = () => {

  const navigate = useNavigate();
  const [donorList, setDonorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState(donorPatientHeaders);

  const api = axios.create({
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const getDonors = useCallback ( async () => {
    try {
      const res = await api.get(donorsListRoute);

      if (res.data.success) {
        setDonorList(res.data.donors);
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
    getDonors();
  }, [getDonors, navigate]);
  
  const updateStatus = async (id,status) => {
    try {
      let newStatus = status === 'rejected' ? 'verified' : 'rejected';
      let route = `${userStatusUpdateRoute}/${id}/${newStatus}`;
      const res = await api.post(route);
      if (res.data.success === true) {
        setDonorList((prevDonorList) => {
          return prevDonorList.map((donor) => {
            if (donor._id === id) {
              return { ...donor, status: newStatus };
            }
            return donor;
          });
        });
      };
    }
    catch (error) {
      console.log(error.response.data);
      toast.error('Failed to update the status', toastOptions);
    }
  }

  useEffect(() => {
    setColumns([...donorPatientHeaders,{
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
            onClick={()=>updateStatus(row._id, row.status)}
            variant={row.status === 'rejected' ? 'success' : 'danger'}
            size="sm">
            {row.status === 'rejected' ? 'Accept' : 'Reject'}
          </Button>
        </>
      )}
    }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donorPatientHeaders]);
 
  return (
    <Container className="h-100">
      {
        loading ? (
          <LoadingSpinner />
        ) : (
            <ReactTable
              title={'Donors ready to Tranfuse'}
              pageSize={8}
              data={donorList}
              columns={columns}
            />
        )
      }
    </Container>
  );
};
