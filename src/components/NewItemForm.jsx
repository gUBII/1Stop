import React,{useState} from 'react'
import {Modal, Button, Form, InputGroup } from 'react-bootstrap';
import services from '../api/services';
import FormDropdown from './FormDropdown';
import {FaPlus} from 'react-icons/fa'

const NewItemForm = ({setShowModal, productState}) => {

    const [products, setProducts] = productState

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [categories, setCategories] = useState('')
    const [stock, setStock] = useState(0)
    const [options, setOptions] = useState([])
    const [img, setImg] = useState('')

    const onFormSubmit = ((e) =>{
      e.preventDefault()
      setShowModal(false)
      const newProduct = { 
        title,
        description,
        price,
        categories,
        stock,
        img
      }
      services.createProduct(newProduct)
        .then(() =>{
          services.getProducts()
          .then(response =>{
            setProducts(response)
          })
  })
})

  return (
    <>
    <Modal.Header closeButton>
    <Modal.Title>Create New Product</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>

      {/* for if we can upload images to db */}
      
      {/* <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control 
          type="file"
          accept="image/png, image/gif, image/jpeg" />
      </Form.Group> */}

      <Form.Group controlId="formGridImg">
          <Form.Label>Image URL</Form.Label>
          <Form.Control value={img} onChange ={e => setImg(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formGridTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} onChange ={e => setTitle(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" value={description} onChange ={e => setDescription(e.target.value)}/>
      </Form.Group>

      <Form.Label>Price</Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
          <Form.Control 
              value={price}
              aria-label="Amount (to the nearest dollar)"
              onChange ={e => setPrice(e.target.value)}
          />
        </InputGroup>

        <Form.Label>Options</Form.Label>
        <Form.Group className="mb-3" controlId="formGridOptions">
          <FormDropdown optionProp={[options,setOptions]}/>
          <Button  
            className="my-2"
            variant="dark"
            onClick = {()=> setOptions([...options, 
              {optionTitle: '', optionValues:['']}
            ])}>
              Add Option Group<FaPlus/>
        </Button>
      </Form.Group>
        
        <Form.Group className="mb-3" controlId="formGridCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control value={categories} onChange ={e => setCategories(e.target.value)}/>
      </Form.Group>



      <Form.Group className="mb-3" controlId="formGridStock">
        <Form.Label>Stock</Form.Label>
        <Form.Control value={stock} onChange ={e => setStock(e.target.value)}/>
      </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button 
              variant="secondary" 
              onClick={()=> setShowModal(false)}>Close
          </Button>
          <Button 
              variant="danger" 
              onClick ={(e)=>onFormSubmit(e)}>Add Product 
          </Button>
      </Modal.Footer>
  </>
  )
}

export default NewItemForm