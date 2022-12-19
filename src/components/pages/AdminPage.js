import { useState } from "react"
import { Table, Spinner, Button, Modal, Form, Col, Row} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import {
    useGetAllOrdersQuery,
    useChangeOrderStatusMutation,
    useGetOrderMutation,
    useGetUser1Mutation,
    useGetAllProductsQuery,
    useCreateProductMutation,
    useAddPictureToProductMutation,
    useUpdateProductMutation
} from "../../api/apiSlice"

const AdminPage = () => {
    const navigate = useNavigate();

    const { data: ordersList = [], isLoading: loadingOrders } = useGetAllOrdersQuery();
    const { data: productsList = [], isLoading: loadingProducts } = useGetAllProductsQuery();
    const [changeOrderStatus] = useChangeOrderStatusMutation();
    const [getOrder] = useGetOrderMutation();
    const [getUser] = useGetUser1Mutation();
    const [createProduct] = useCreateProductMutation();
    const [addPictureToProduct] = useAddPictureToProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    const [productsCount, setProductsCount] = useState([]);
    const [productIds, setProductIds] = useState([]);

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [picture, setPicture] = useState('')
    const [type, setType] = useState('')

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const [showProducts, setShowProducts] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setUpdate] = useState(false);
    
    const orderInfo = async (id) => {
        await getOrder(id).unwrap()
            .then(res => {
                setProductIds(res.productIds)
                setProductsCount(res.productsCount)
                setShowProducts(true)
            })
        
    }

    const userInfo = async (id) => {
        await getUser(id)
            .unwrap()
            .then(user => {
                setFirstName(user.firstName)
                setLastName(user.lastName)
                setCity(user.address ? user.address.split(', ')[0] : '')
                setStreet(user.address ? user.address.split(', ')[1] : '')
                setHouseNumber(user.address ? +user.address.split(', ')[2] : 0)
                setPhoneNumber(user.phoneNumber)
                setEmail(user.email)
                setShowUser(true)
            })
        
    }

    const productUpdateInfo = (id, name, price) => {
        setId(id)
        setName(name)
        setPrice(price)
        setUpdate(true)
    }

    const renderOrders = (arr) => {
        const items = arr.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td><Button variant="info" onClick={() => userInfo(item.userId)}>User info</Button></td>
                    <td><Button variant="info" onClick={() => orderInfo(item.id)}>Products</Button></td>
                    <td>{item.totalPrice}</td>
                    <td>
                        <Form.Select style={(+item.statusId === 3) ? { backgroundColor: '#FF0000' } :
                            (+item.statusId === 2) ? { backgroundColor: '#00FF00' } : { backgroundColor: '#FFFF00' }}
                            onChange={(e) => { changeOrderStatus({ orderId: item.id, orderStatus: e.target.value }).unwrap()}}
                            value={item.statusId}>
                            <option style={{backgroundColor: '#FFFFFF'}} value="1">Pending</option>
                            <option style={{backgroundColor: '#FFFFFF'}} value="2">Approved</option>
                            <option style={{backgroundColor: '#FFFFFF'}} value="3">Rejected</option>
                        </Form.Select>
                    </td>
                </tr>
            )
        })
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Table striped bordered hover style={{width: '550px'}}>
                    <thead>
                        <tr>
                            <th style={{width: '80px'}}>Order id</th>
                            <th style={{ width: '110px' }}>User info</th>
                            <th style={{width: '110px'}}>Products</th>
                            <th style={{width: '100px'}}>Total price</th>
                            <th style={{width: '150px'}}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                 </Table>
            </div>
        )
    }

    const renderProductList = (arr) => {
        const items = arr.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.productType.id}</td>
                    <td><Button variant="info" onClick={() => productUpdateInfo(item.id, item.name, item.price)}>Update</Button></td>
                </tr>
            )
        })
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Table striped bordered hover style={{width: '810px'}}>
                    <thead>
                        <tr>
                            <th style={{width: '100px'}}>Product id</th>
                            <th style={{width: '450px'}}>Name</th>
                            <th style={{width: '80px'}}>Price</th>
                            <th style={{width: '80px'}}>Type id</th>
                            <th style={{width: '100px'}}>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                 </Table>
            </div>
        )
    }

    const renderProducts = (listId, listCount) => {
        const items = listId.map((item, index) => {
            return (
                <tr key={item}>
                    <td>{item}</td>
                    <td>{listCount[index]}</td>
                </tr>
            )
        })
        
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product id</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </Table>
        )
    }

    const renderUser = () => {
        return (
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <td>First name</td>
                        <td>{firstName}</td>
                    </tr>
                    <tr>
                        <td>Last name</td>
                        <td>{lastName }</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{email }</td>
                    </tr>
                    <tr>
                        <td>Phone number</td>
                        <td>{phoneNumber }</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>{city }</td>
                    </tr>
                    <tr>
                        <td>Street</td>
                        <td>{street }</td>
                    </tr>
                    <tr>
                        <td>House number</td>
                        <td>{houseNumber }</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
    
    const onUpdateProduct = async (e) => {
        e.preventDefault();
        if (!!name && !!price) {
            await updateProduct({
                id, name, price
            }).unwrap().then(res => {
                alert("Saved");
                setName('')
                setPrice('')
            })
            if (!!picture) {
                await addPictureToProduct({ id, file: picture }).unwrap()
                    .then(res => {
                        setPicture('')
                    })
            }
        }
    }
    
    const onCreateProduct = async (e) => {
        e.preventDefault()
        if (!!name && !!price  && !!type) {
            await createProduct({
                name, price, productType: type
            }).then(res => {
                alert("Create");
                setName('')
                setPrice('')
                setType('')
            })
        }
    }

    const items = renderOrders(ordersList);
    const products = renderProductList(productsList)
    const spinnerProducts = loadingProducts ? <Spinner animation="border" variant="info" /> : null;
    const spinnerOrders = loadingOrders ? <Spinner animation="border" variant="info" /> : null;
    const contentProducts = !loadingProducts ? products : null;
    const contentOrders = !loadingOrders ? items : null;

    return (
        <>
            <Button className="m-1" onClick={() => navigate("/")}>Home page</Button>
            <h1 style={{textAlign: 'center'}}>Admin panel</h1>
            <Row>
                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{textAlign: 'center'}}>Orders</h2>
                    {spinnerOrders}
                    {contentOrders}
                </Col>
                <Col style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h2 style={{textAlign: 'center'}}>Products</h2>
                    <Button style={{ marginBottom: '10px' }} onClick = {() => setShowCreate(true)} variant="success">Create new product</Button>
                    {spinnerProducts}
                    {contentProducts}
                </Col>
            </Row>
            

            <Modal show={showProducts} onHide={() => setShowProducts(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {renderProducts(productIds, productsCount)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowProducts(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showUser} onHide={() => setShowUser(false)}>

                <Modal.Header closeButton>
                    <Modal.Title>User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {renderUser()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUser(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showUpdate} onHide={() => setUpdate(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onUpdateProduct}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                onChange={(e) => setName(e.target.value) }
                                value={name} />
                        </Form.Group>
                       <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter price"
                                onChange={(e) => setPrice(e.target.value) }
                                value={price} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Picture</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => { console.log(e.target.files[0]);  setPicture(e.target.files[0]) } }/>
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Зберегти
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setUpdate(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showCreate} onHide={() => setShowCreate(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onCreateProduct}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                onChange={(e) => setName(e.target.value) }
                                value={name} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter type"
                                onChange={(e) => setType(e.target.value) }
                                value={type} />
                        </Form.Group>
                       <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter price"
                                onChange={(e) => setPrice(e.target.value) }
                                value={price} />
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Зберегти
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreate(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminPage