import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { patientsListRoute } from '../../utils/ApiRoutes';
import { Button, Container } from 'react-bootstrap';
import ReactTable from '../../components/ReactTable';
import { donorPatientHeaders } from '../../utils/tableHeaders/donorPatinetHeaders';

export const Patient = () => {

  const navigate = useNavigate();
  const [patientList, setPatientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState(donorPatientHeaders);

  const getPatients = useCallback ( async () => {
    try {
      const res = await axios.get(patientsListRoute, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

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
  }, [navigate])

  useEffect(() => {
    getPatients();
  }, [getPatients, navigate]);

  useEffect(() => {
    setColumns([...columns,{
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
