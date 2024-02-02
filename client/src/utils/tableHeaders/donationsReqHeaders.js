import moment from 'moment';

export const donationReqHeaders = [
  {
    dataField: "_id",
    text: "Id",
    headerStyle: {
      backgroundColor: "#DEDADA",
      width: '6rem'
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
      backgroundColor: "#DEDADA",
      width: '12rem'
    },
    formatter: (cell, row) => row.donor ? row.donor : row.patient
  },
  {
    dataField: "disease",
    text: "Disease",
    headerStyle: {
      backgroundColor: "#DEDADA",
      width: '12rem'
    },
    formatter: (cell) => cell ? cell : 'N/A'
  },
  {
    dataField: "bloodGroup",
    text: "Group",
    headerStyle: {
      backgroundColor: "#DEDADA",
      width: '4rem'
    },
  },
  {
    dataField: "quantity",
    text: "Units",
    headerStyle: {
      backgroundColor: "#DEDADA",
      width: '4rem'
    },
  },
  {
    dataField: "registerDate",
    text: "Registerd On",
    headerStyle: {
      backgroundColor: "#DEDADA",
      width: '10rem'
    },
    formatter: (cell) => cell ?  moment(cell).format('MMMM Do YYYY') : 'N/A'
  },
  {
    dataField: "status",
    text: "Status",
    sort: true,
    headerStyle: {
      backgroundColor: "#DEDADA",
      width: '6rem'
    },
    formatter: (cell) => (  
      <span>
        <strong style={{
          color: cell === 'rejected' ? 'red' :
            cell === 'accepted' ? 'green' :
              '#FFBF00', 
            textTransform: 'capitalize' 
        }}>
          {cell}
        </strong>
      </span>
    )
  }
];