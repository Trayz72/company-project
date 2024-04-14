import {useState, useEffect} from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios';

const Customerrpt = () => {
  const [data, setData] = useState([]);

  useEffect(()=> {
    axios
      .get("http://localhost:3030/getAllCustomer")
      .then(res => setData(res.data))
      .catch(error => console.log(error)) 
  }, [])
  
  return (
    <div className="table-container">
    {data.length !== 0 ? (
        <table border={1}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>address</th>
              <th>contact number</th>
              <th>email</th>
              <th>pincode</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} >
                <td>{item.UserId}</td>
                <td>{item.Username}</td>
                <td>{item.Address}</td>
                <td>{item.Contact_Number}</td>
                <td>{item.Email}</td>
                <td>{item.Pincode}</td>
              </tr>
            ))}
          </tbody>
        </table>
    ) : (
      <h2>No records available</h2>
    )}
  </div>
  )
}

export default Customerrpt