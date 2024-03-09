import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export const ProductDetail = () => {
  const [values, setValues] = useState({})

  const {id} = useParams();
  
  useEffect(()=>{
    axios
      .get("http://localhost:3030/getProductDetailById/" + id)
      .then(res => setValues(prevValue => ({
        ...prevValue,
        ProductName: res.data[0].ProductName,
        ProductDescription: res.data[0].ProductDescription,
        ProductPrice: res.data[0].ProductPrice,
        Image: res.data[0].Image,
      })))
      .catch(err => console.log(err))
  }, [id])
  
  return (
    <div>
     <div>
        <img
          src={`http://localhost:3030/images/${values.Image}`}
          alt={values.ProductName}
          style={{ maxWidth: '300px', maxHeight: '250px' }}
        />
      </div>
      <div>
        <h3>{values.ProductName}</h3>
        <p>{values.ProductDescription}</p>
        <p>Price: {values.ProductPrice}</p>
      </div>
    </div>
  )
}
