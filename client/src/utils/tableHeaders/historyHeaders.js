import moment from 'moment';

export const historyHeaders = [
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
    dataField: "name",
    text: "Name",
    sort: true,
    headerStyle: {
      backgroundColor: "#DEDADA",
      width: '12rem'
    }
  },
  {
    dataField: "disease",
    text: "Disease",
    headerStyle: {
      backgroundColor: "#DEDADA",
      width: '10rem'
    },
    formatter: (cell) => cell ? cell : 'N/A'
  },
  {
    dataField: "bloodGroup",
    text: "Group",
    sort: true,
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
    dataField: "updatedAt",
    text: "Last Updated",
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