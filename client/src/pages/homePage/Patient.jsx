import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { patientsListRoute } from '../../utils/ApiRoutes';
import { Container } from 'react-bootstrap';
import { patientColumns } from '../../utils/tableHeaders/patientHeaders';
import ReactTable from '../../components/ReactTable';

export const Patient = () => {

  const navigate = useNavigate();
  const [patientList, setPatientList] = useState([]);
  const [loading, setLoading] = useState(true);

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
              columns={patientColumns}
            />
        )
      }
    </Container>
  );
};
