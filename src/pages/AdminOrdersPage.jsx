import React,{useState, useEffect} from 'react'
import services from '../api/services'
import {Form, Container, Table} from 'react-bootstrap'

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    services.getOrders()
      .then(response =>{
        setOrders(response)
      return () => {
        setOrders([])
    }
  })
}, [])

const orderTable = () =>{
  return (
    <Table striped>
      <thead>
        <tr>
          <th></th>
          <th>Order No.</th>
          <th>Customer Name</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
      {orders.length!==0 ? orders.map((order)=>{
          return(
          <tr key={order._id}>
              <td><Form.Check aria-label={`Select order`} /></td>
              <td>{order._id}</td>
              <td>{order.name}</td>
              <td>${order.amount}</td>
              <td>{order.status}</td>
          </tr>
          )
        }): 'No orders have been placed'}
      </tbody>
    </Table>
)}

  return (
    <Container fluid>
      <div>
          <h2 className="mt-2">Orders</h2>
      </div>
      <div>
        {orderTable()}
      </div>
    </Container>
  )
}

export default AdminOrdersPage