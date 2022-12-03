import React, {useState} from 'react'
import {useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Form, InputGroup } from 'react-bootstrap';
import services from '../api/services';
import {FaPlus} from 'react-icons/fa'
import FormDropdown from '../components/FormDropdown';

const AdminItemPage = () => {

    const product = useLocation().state
    const navigate = useNavigate();

    
    const [title, setTitle] = useState(product.title)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [options, setOptions] = useState(product.options)
    const [categories, setCategories] = useState(product.categories)

    const onFormSubmit = ((e) =>{
        e.preventDefault()
        const newValue = {
            title,
            description,
            price,
            options,
            categories,
        }
        services.updateProduct(product._id, newValue)
            .then(navigate(-1))
    })

    

  return (
<Container>
        <img
             src={product.img}
             alt={product.title}
             width= {200}
             height = {300}
             priority="true"
        />
        <Form>
        <Form.Group className ='mb-3 w-25' controlId="formGridTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} onChange ={e => setTitle(e.target.value)}/>
        </Form.Group>

      <Form.Group className="mb-3 w-50" controlId="formGridDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control 
          as="textarea" 
          value={description} 
          onChange ={e => setDescription(e.target.value)}/>
      </Form.Group>

      <Form.Label>Price</Form.Label>
      <InputGroup className="mb-3 w-25">
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control 
            value={price}
            aria-label="Amount (to the nearest dollar)"
            onChange ={e => setPrice(e.target.value)}
         />
      </InputGroup>
        
      <Form.Group className="mb-3 w-25 d-flex flex-column" controlId="formGridOptions">
        <Form.Label>Options</Form.Label>
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

      <Form.Group className="mb-3 w-25" controlId="formGridCategories">
          <Form.Label>Categories</Form.Label>
          <Form.Control value={categories} onChange ={e => setCategories(e.target.value)}/>
        </Form.Group>

      <Button  
        className="my-2"
        variant="primary"
        size="lg"
        onClick ={e=>onFormSubmit(e)}>
        Update Product </Button>
      </Form>
      </Container>
  )
}

export default AdminItemPage