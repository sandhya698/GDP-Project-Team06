import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { donorsListRoute } from '../../utils/ApiRoutes';

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
  }, [getDonors, navigate])

  return (
    <>
      {
        loading ? (
          <LoadingSpinner />
        ) : (
            <h1>donor list</h1>
        )
      }
    </>
  )
}
