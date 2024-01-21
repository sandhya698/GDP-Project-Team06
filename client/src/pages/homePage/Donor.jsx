import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { donorsListRoute, userStatusUpdateRoute } from '../../utils/ApiRoutes';
import { Container } from 'react-bootstrap';
import ReactTable from '../../components/ReactTable';
import { Button } from "react-bootstrap";
import { donorPatientHeaders } from '../../utils/tableHeaders/donorPatinetHeaders';

export const Donor = () => {

  const navigate = useNavigate();
  const [donorList, setDonorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState(donorPatientHeaders);

  const getDonors = useCallback ( async () => {
    try {
      const res = await axios.get(donorsListRoute, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

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
  }, [navigate])

  useEffect(() => {
    getDonors();
  }, [getDonors, navigate]);
  

  const updateStatus = async (id,status) => {
    try {
      let route = `${userStatusUpdateRoute}/${id}/${status === 'rejected' ? 'verified' : 'rejected'}`;
      console.log(route);
      const updatedStatus = await axios.post(route,{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },  
      });

      console.log(updatedStatus);

    }
    catch (error) {
      console.log(error.response);
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
