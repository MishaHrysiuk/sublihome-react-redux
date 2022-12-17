import { useNavigate } from "react-router-dom";
import { Spinner, ListGroup, Card, Button, Pagination, Row, Col } from "react-bootstrap";
import {
    useGetItemsFromCartQuery,
    useUpdateCartMutation,
    useCreateNewOrderMutation
} from "../../api/apiSlice";
import { useAuth } from "../../hooks/auth.hook";

import Bg from '../../resources/img/cup_1.PNG';

const CartPage = () => {

    const { currentUserId } = useAuth();
    
    const [updateCart] = useUpdateCartMutation();
    const [createNewOrder] = useCreateNewOrderMutation();
    const {
        data: cartList = [],
        isLoading
    } = useGetItemsFromCartQuery(currentUserId); 

    const navigate = useNavigate()

    function getCards(arr) {
        const idList = cartList.map(item => item.productId);
        const countList = cartList.map(item => item.count);

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
        const idList = cartList.map(item => item.productId);
        const countList = cartList.map(item => item.count);

        const filteredArr = arr.filter(item => idList.includes(item.productId))
        if (!filteredArr.length) {
            return 0
        }
        const totalPrice = filteredArr.map((item, index) => item.price*countList[index])
            .reduce((a, b) => a + b)
        return(totalPrice)
    }

    const onReduce = async (index) => {
        const idList = cartList.map(item => item.productId);
        const countList = cartList.map(item => item.count);
        countList[index] = (countList[index] - 1 > 0) ? countList[index] - 1 : 1
        await updateCart({
            userId: currentUserId,
            productsList: idList,
            productsCount: countList
        }).unwrap();
    } 

    const onIncrease = async (index) => {
        const idList = cartList.map(item => item.productId);
        const countList = cartList.map(item => item.count);
        countList[index] = countList[index] + 1;
        await updateCart({
            userId: currentUserId,
            productsList: idList,
            productsCount: countList
        }).unwrap();
    } 

    const onDeleteProduct = async (index) => {
        const idList = cartList.map(item => item.productId);
        const countList = cartList.map(item => item.count);
        await updateCart({
            userId: currentUserId,
            productsList: idList.filter((item, i) => i!==index),
            productsCount: countList.filter((item, i) => i !== index)
        }).unwrap();
    }

    const onSubmitOrder = async () => {
        await createNewOrder({userId: currentUserId})
            .then(res => {
                navigate('/products');
                alert("Ваш заказ створенний. Очікуйте дзвінка для підтвердження")
            })
    }

    const items = getCards(cartList);
    const notFound = (!items && !isLoading) ? <h1>Корзина порожня</h1> : null;
    const spinner = isLoading ? <Spinner animation="border" variant="info" /> : null;
    const content = !isLoading ? items : null;

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