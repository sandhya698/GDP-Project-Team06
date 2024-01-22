import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { donorsListRoute, userStatusUpdateRoute } from '../../utils/ApiRoutes';
import { Container } from 'react-bootstrap';
import ReactTable from '../../components/ReactTable';
import { Button } from "react-bootstrap";
import { donorPatientHeaders } from '../../utils/tableHeaders/donorPatinetHeaders';
import { toast } from 'react-toastify';

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
  
  const toastOptions = {
		position: "bottom-right",
		autoClose: 3000,
		pauseOnHover: true,
		draggable: true,
    theme: "light", 
	};

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


  // const donorColumns = [
  //   {
  //     dataField: "_id",
  //     text: "Id",
  //     headerStyle: {
  //       backgroundColor: "#DEDADA"
  //     },
  //     style: {  overflow: 'hidden',
  //       textOverflow: 'ellipsis'}
  //   },
  //   {
  //     dataField: "name",
  //     text: "Name",
  //     sort: true,
  //     headerStyle: {
  //       backgroundColor: "#DEDADA"
  //     }
  //   },
  //   {
  //     dataField: "email",
  //     text: "Email",
  //     headerStyle: {
  //       backgroundColor: "#DEDADA"
  //     },
  //   },
  //   {
  //     dataField: "registerDate",
  //     text: "Registerd On",
  //     headerStyle: {
  //       backgroundColor: "#DEDADA"
  //     },
  //     formatter: (cell) =>  moment(cell).format('MMMM Do YYYY')
  //   },
  //   {
  //     dataField: "status",
  //     text: "Status",
  //     sort: true,
  //     headerStyle: {
  //       backgroundColor: "#DEDADA"
  //     },
  //     formatter: (cell) => (  
  //       <span>
  //         <strong style={ { color: `${cell === 'rejected' ? 'red' : 'green'}`, textTransform: 'capitalize'} }> { cell } </strong>
  //       </span>
  //     )
  //   },
  //   {
  //     dataField: "Actions",
  //     isDummyField: true,
  //     text: "Actions",
  //     headerStyle: {
  //       backgroundColor: "#DEDADA",
  //       width: '10%'
  //     },
  //     formatter: (cell, row) => {
  //       return (  <>
  //         <Button
  //           onClick={()=>updateStatus(row.status)}
  //           variant={row.status === 'rejected' ? 'success' : 'danger'}
  //           size="sm"
  //         >
  //           {row.status === 'rejected' ? 'Accept' : 'Reject'}
  //         </Button>
  //       </>
  //     )}
  //   }
  // ];

  useEffect(() => {
    setColumns([...donorPatientHeaders,{
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
            onClick={()=>updateStatus(row._id, row.status)}
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
              title={'Donors ready to Tranfuse'}
              pageSize={8}
              data={donorList}
              // columns={donorColumns}
              columns={columns}
            />
        )
      }
    </Container>
  );
};
