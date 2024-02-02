import moment from 'moment';

export const donorPatientHeaders = [
  {
    dataField: "_id",
    text: "Id",
    headerStyle: {
      backgroundColor: "#DEDADA",
      width: '8rem'
    },
    style: {  overflow: 'hidden',
      textOverflow: 'ellipsis'}
  },
  {
    dataField: "name",
    text: "Name",
    sort: true,
    headerStyle: {
      backgroundColor: "#DEDADA",
      width: '14rem'
    }
  },
  {
    dataField: "email",
    text: "Email",
    headerStyle: {
      backgroundColor: "#DEDADA",
      width: '18rem'
    },
  },
  {
    dataField: "registerDate",
    text: "Registerd On",
    headerStyle: {
      backgroundColor: "#DEDADA",
      width: '10rem'
    },
    formatter: (cell) => cell ? moment(cell).format('MMMM Do YYYY') : 'N/A'
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
            cell === 'verified' ? 'green' :
              '#FFBF00', 
            textTransform: 'capitalize' 
        }}>
          {cell}
        </strong>
      </span>
    )
  }
];