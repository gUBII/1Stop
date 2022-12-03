import React, {useEffect} from 'react'
import {Form, Table} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import services from '../api/services'
import {BsTrash} from 'react-icons/bs'

const ProductTable = ({productState}) => {

  const navigate = useNavigate();
  const [products, setProducts] = productState

  useEffect(() => {
    services.getProducts()
      .then(response =>{
        setProducts(response)
      return () => {
        setProducts([])
    }
  })
}, [])

  const onItemClick = ((product)=>{
    navigate(`/admin/products/${product._id}`, {state: product});
})

const deleteProduct = (id)=>{
  services.deleteProduct(id)
    .then(() =>{
      services.getProducts()
      .then(response =>{
        setProducts(response)
    })
  })
}

    const tableItem = products.map((product)=>{
        return(
              <tr key={product._id}>
                  <td><Form.Check aria-label={`Select ${product.title}`} /></td>
                  <td onClick ={() => onItemClick(product)}>{product._id}</td>
                  <td onClick ={() => onItemClick(product)}>{product.title}</td>
                  <td onClick ={() => onItemClick(product)}>{product.description}</td>
                  <td onClick ={() => onItemClick(product)}>${product.price}</td>
                  <td onClick ={() => onItemClick(product)}>{product.categories?.toString()}</td>
                  <td><BsTrash onClick ={()=> deleteProduct(product._id)}/></td>
              </tr>
        )
    })

    return (

        <Table striped>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableItem}
          </tbody>
        </Table>
    )
}

export default ProductTable