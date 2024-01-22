import moment from 'moment';

export const donationReqHeaders = [
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
    dataField: "Name",
    isDummyField: true,
    text: "Name",
    sort: true,
    headerStyle: {
      backgroundColor: "#DEDADA"
    },
    formatter: (cell, row) => row.donor ? row.donor : row.patient
  },
  {
    dataField: "bloodGroup",
    text: "Group",
    headerStyle: {
      backgroundColor: "#DEDADA"
    },
  },
  {
    dataField: "quantity",
    text: "Units",
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
  }
];