import { Accordion, Spinner, Table } from "react-bootstrap";
import { useAuth } from "../../hooks/auth.hook";
import { useGetAllOrdersWithItemsQuery } from "../../api/apiSlice";

const OrdersPage = () => {
    const { currentUserId } = useAuth();
    const {data: orderList = [], isLoading} = useGetAllOrdersWithItemsQuery(currentUserId);

    const getStatus = (id) => {
        if (id === 1) {
            return (<i className="fa-solid fa-circle-dot" style={{ color: '#FFFF00', fontSize: '24px' }}>  В очікуванні </i>)
        } else if (id === 2) {
            return (<i className="fa-solid fa-circle-check" style={{ color: '#00FF00', fontSize: '24px' }}>  Прийнято </i>)
        } else if (id === 3) {
            return (<i className="fa-solid fa-circle-xmark green" style={{ color: '#FF0000', fontSize: '24px' }}>  Відхиленно </i>)
        } else {
            return null
        }
    }

    const getOrders = (arr) => {
        const items = arr.map((item) => {
            return (
                <Accordion.Item
                    eventKey={item.order}
                    key={item.order}>
                    <Accordion.Header style={{ width: '600px', fontSize: '20px', width: '100%' }}>
                        <div style={{ display: 'flex', width: '600px' }}>
                            <div style={{width: '250px' }}>{getStatus(item.statusId)}</div>
                            <div style={{width: '280px' }}>Замовлення №{item.order}</div>
                            <div style={{width: '120px' }}>Ціна - {item.totalPriceOfOrder} ₴ </div>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <h3>Замовленні продукти</h3>
                        {getProducts(item.productIds, item.productsCount, item.productsNames)}
                    </Accordion.Body>
                </Accordion.Item>
            )
        })
        if (!items.length) {
            return null
        } else {
            return (
            <Accordion defaultActiveKey="0">
                {items}
            </Accordion>
        )
        }
    }

    const getProducts = (listId, listCount, listName) => {
        const items = listId.map((item, index) => {
            return (
                <tr key={item}>
                    <td>{item}</td>
                    <td>{listName[index].length > 50 ? listName[index].slice(0, 50)+'...': listName[index]}</td>
                    <td>{listCount[index]}</td>
                </tr>
            )
        })
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Назва</th>
                        <th>Кількість</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </Table>
        )
    }

    const items = getOrders(orderList);
    const notFound = (!items && !isLoading) ? <h1>У вас ще намає замовлень :(</h1> : null;
    const spinner = isLoading ? <Spinner animation="border" variant="info" /> : null;
    const content = !isLoading ? items : null;

    return (
        <div className="block">
            <div className="container">
                <div className="block__title title">Мої замовлення</div>
                <div className="block__column">
                    {spinner}
                    {content}
                    {notFound}
                </div>
            </div>
        </div>
    )
}

export default OrdersPage;