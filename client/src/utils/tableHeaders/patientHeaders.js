import { Button } from "react-bootstrap";
import moment from "moment";

export const patientColumns = [
  {
    dataField: "_id",
    text: "Id",
    headerStyle: {
      backgroundColor: "#DEDADA"
    },
    style: {  overflow: 'hidden',
      textOverflow: 'ellipsis'}
  },
  {
    dataField: "name",
    text: "Name",
    sort: true,
    headerStyle: {
      backgroundColor: "#DEDADA"
    }
  },
  {
    dataField: "email",
    text: "Email",
    headerStyle: {
      backgroundColor: "#DEDADA"
    },
  },
  {
    dataField: "registerDate",
    text: "Registerd On",
    headerStyle: {
      backgroundColor: "#DEDADA"
    },
    formatter: (cell) =>  moment(cell).format('MMMM Do YYYY')
  },
  {
    dataField: "status",
    text: "Status",
    sort: true,
    headerStyle: {
      backgroundColor: "#DEDADA"
    },
    formatter: (cell) => (  
      <span>
        <strong style={ { color: `${cell === 'rejected' ? 'red' : 'green'}`, textTransform: 'capitalize'} }> { cell } </strong>
      </span>
    )
  },
  {
    dataField: "Actions",
    isDummyField: true,
    text: "Actions",
    headerStyle: {
      backgroundColor: "#DEDADA",
      width: '10%'
    },
    formatter: (cell, row) => {
      return (  <>
          <Button variant={row.status === 'rejected' ? 'success': 'danger'} size="sm">{ row.status === 'rejected' ? 'Accept' : 'Reject' }</Button>
      </>
    )}
  }
];