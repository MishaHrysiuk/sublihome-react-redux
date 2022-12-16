import axios from "axios";
import DefaultsAxios from "../../helpers/jwt-interceptor";

import { CartService, OrderService } from "../../services/sublihome-service";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, ListGroup, Card, Button, Pagination, Row, Col } from "react-bootstrap";

import Bg from '../../resources/img/cup_1.PNG';
import { authenticationService } from "../../services/auth-service";
import { errorInterceptor } from "../../helpers/error-interceptor";

const CartPage = () => {
    const cartService = new CartService(axios.defaults.baseURL, DefaultsAxios);
    const orderService = new OrderService(axios.defaults.baseURL, DefaultsAxios);
    const currentUserId = authenticationService.currentUserId;

    const navigate = useNavigate()

    const [cartList, setCartList] = useState([]);
    const [idList, setIdList] = useState([]);
    const [countList, setCountList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [change, setChange] = useState(false);

    const idListRef = useRef();
    idListRef.current = idList;
    const countListRef = useRef();
    countListRef.current = countList;
    const cartListRef = useRef();
    cartListRef.current = cartList;

    const [submit, setSubmit] = useState(false);
    const submitRef = useRef();
    submitRef.current = submit;

    useEffect(() => {
        setTimeout(() => {
            onRequest();
        }, 1000)
        return (() => {
            if (!submitRef.current) {
                onSendRequest();
            }
        })
    }, [])

    useEffect(() => {}, [change])

    const onRequest = async () => {
        await cartService.getItemsFromCart(currentUserId)
            .then(onCartListLoaded)
            .catch(errorInterceptor)
    }

    const onSendRequest = async () => {
        const idList = cartListRef.current.map(item => item.productId);
        const countList = cartListRef.current.map(item => item.count);
        if (JSON.stringify(idList) !== JSON.stringify(idListRef.current) ||
            JSON.stringify(countList) !== JSON.stringify(countListRef.current)) {
            await cartService.updateCart({
                userId: currentUserId,
                productsList: idListRef.current,
                productsCount: countListRef.current
            })
                .then()
                .catch(errorInterceptor)
        }
    }

    const onCartListLoaded = (list) => {
        const idList = list.map(item => item.productId);
        const countList = list.map(item => item.count);
        setIdList(idList)
        setCountList(countList)
        setCartList(list)
        setLoading(false);
    }

    function getCards(arr) {
        const items = arr.filter(item => idList.includes(item.productId))
            .map((item, index) => {
            const picture = item.picture ? `data:image/png;base64,${item.picture.fileContents}` : `${Bg}`;
            return (
                <ListGroup.Item style={{ height: '5rem', display: 'flex', alignItems:'center' }}
                    key={item.id}>
                    <Row style={{ width: '100%' }}>
                        <Col xs={1}>
                            <img src={picture} alt="55" height='60px'/>
                        </Col>
                        <Col style={{ marginTop: '20px' }}>
                            {item.name}
                        </Col>
                        <Col xs={1} style={{ marginTop: '20px' }}>
                            {countList[index]*item.price} ₴
                        </Col>
                        <Col xs={2}>
                            <Pagination style={{ marginTop: '11px' }}>
                                <Pagination.Prev onClick={() => onReduce(index)}>-</Pagination.Prev>
                                <Pagination.Item disabled>{countList[index]}</Pagination.Item>
                                <Pagination.Next onClick={() => onIncrease(index)}>+</Pagination.Next>
                                <Button variant="danger" onClick={() => onDeleteProduct(index)} style={{ marginLeft: '1rem'}}>Видалити</Button>
                            </Pagination>
                        </Col>
                    </Row>
                </ListGroup.Item>
            )
        })

        if (!items.length) {
            return null
        }
        return (
            <>
            <Card style={{ width: '100%' }}>
                 <ListGroup variant="flush">
                    {items}
                </ListGroup>
            </Card>
            <h4 style={{ alignSelf: 'start', marginTop: '10px' }}>Загальна вартість: {getTotalPrice(cartList)} ₴</h4>
            <Button style={{ alignSelf: 'start', marginTop: '10px' }} onClick={onSubmitOrder} variant="success">Замовити</Button>    
            </>
        )
    }

    function getTotalPrice(arr) {
        const filteredArr = arr.filter(item => idList.includes(item.productId))
        if (!filteredArr.length) {
            return 0
        }
        const totalPrice = filteredArr.map((item, index) => item.price*countList[index])
            .reduce((a, b) => a + b)
        return(totalPrice)
    }

    const onReduce = (index) => {
        const list = countList
        list[index] = (list[index] - 1 > 0) ? list[index] - 1 : 1
        setCountList(list)
        setChange(change => !change)
    } 

    const onIncrease = (index) => {
        const list = countList
        list[index] = list[index] + 1
        setCountList(list)
        setChange(change => !change)
    } 

    const onDeleteProduct = (index) => {
        setCountList(countList => countList.filter((item, i) => i !== index))
        setIdList(idList => idList.filter((item, i) => i!==index))
        setChange(change => !change)
    }

    const onSubmitOrder = async () => {
        setSubmit(submit => !submit);
        await onSendRequest();
        await orderService.createNewOrder({userId: currentUserId})
            .then(res => {
                navigate('/products');
                alert("Ваш заказ створенний. Очікуйте дзвінка для підтвердження")
            })
            .catch(errorInterceptor)
    }

    const items = getCards(cartList);
    const notFound = (!items && !loading) ? <h1>Корзина порожня :(</h1> : null;
    const spinner = loading ? <Spinner animation="border" variant="info" /> : null;
    const content = !loading ? items : null;

    return (
        <div className="block">
            <div className="container">
                <div className="block__title title">Корзина</div>
                <div className="block__column">
                    {spinner}
                    {content}
                    {notFound}
                </div>
            </div>
        </div>
    )
}

export default CartPage