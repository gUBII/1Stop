import React, {useState} from 'react'
import ProductTable from '../components/ProductTable';
import NewItemForm from '../components/NewItemForm';
import {Button, Container, Modal} from 'react-bootstrap'

const AdminProductsPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([]);

    return (
        <Container fluid>
        <Button 
            className="float-end"
            variant="danger" 
            onClick={()=>setShowModal(true)}
            >+ Create New Product</Button>
        <div>
            <h2 className="mt-2">Products</h2>
            <ProductTable productState={[products, setProducts]}/>
        </div>
        <Modal show={showModal} 
                onHide={()=>setShowModal(false)}
                backdrop="static">
            <NewItemForm 
            setShowModal={setShowModal}
            productState={[products, setProducts]}
            />
        </Modal>
    </Container>
  )
}

export default AdminProductsPage