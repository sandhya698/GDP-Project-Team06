import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { patientsListRoute, userStatusUpdateRoute } from '../../utils/ApiRoutes';
import { Button, Container } from 'react-bootstrap';
import ReactTable from '../../components/ReactTable';
import { donorPatientHeaders } from '../../utils/tableHeaders/donorPatinetHeaders';
import { toast } from 'react-toastify';
import { toastOptions } from '../../utils/toasOptions';

export const Patient = () => {

  const navigate = useNavigate();
  const [patientList, setPatientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState(donorPatientHeaders);

  const api = axios.create({
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const getPatients = useCallback ( async () => {
    try {
      const res = await api.get(patientsListRoute);

      if (res.data.success) {
        setPatientList(res.data.patients);
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
    getPatients();
  }, [getPatients]);

  const updateStatus = async (id,status) => {
    try {
      let newStatus = status === 'rejected' ? 'verified' : 'rejected';
      let route = `${userStatusUpdateRoute}/${id}/${newStatus}`;
      const res = await api.post(route);
      if (res.data.success === true) {
        setPatientList((prevDonorList) => {
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
  }, [donorPatientHeaders]);
 
  return (
    <Container className="h-100">
      {
        loading ? (
          <LoadingSpinner />
        ) : (
          <ReactTable
              title={'Patients waiting for Transfusion'}
              pageSize={8}
              data={patientList}
              columns={columns}
            />
        )
      }
    </Container>
  );
};
