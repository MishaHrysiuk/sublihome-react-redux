import ProductCard from "../product-card/product-card";
import { Card, Spinner, Form, Row, Col, Pagination, Button } from "react-bootstrap";
import { useMemo } from "react";

import {
    useGetAllProductsQuery,
    useGetAllProductTypesQuery,
    useGetItemsFromCartQuery,
    useUpdateCartMutation,
} from "../../api/apiSlice";

import { usePagging } from "../../hooks/pagging.hook";
import { useFiltering } from "../../hooks/filtering.hook";
import { useAuth } from "../../hooks/auth.hook";

const ProductsPage = () => {

    const { login, logout, currentUserId } = useAuth();

    const {
        currentPage,
        countElemOnPage,
        setCurrentPage,
        nextPage,
        prevPage,
        firstPage,
        lastPage
    } = usePagging();

    const {
        dataFiltering,
        setSearch,
        setType,
        setMaxPrice,
        search,
        type,
        maxPrice
    } = useFiltering();

    const {
        data: productList = [],
        ...getAllProductsStatus
    } = useGetAllProductsQuery();

    const {
        data: typeList = []
    } = useGetAllProductTypesQuery();

    const {
        data: cartList = []
    } = useGetItemsFromCartQuery(currentUserId);

    const [updateCart] = useUpdateCartMutation();
    
    const onAddProductToCart = (id) => {
        const idList = cartList.map(item => item.productId);
        const countList = cartList.map(item => item.count);
        if (!idList.includes(id)) {
            updateCart({
                userId: currentUserId,
                productsList: [...idList, id],
                productsCount: [...countList, 1]
            }).unwrap();
        }
    }

    const renderCards = (arr) => {
        const startElem = currentPage * countElemOnPage - countElemOnPage;
        const endElem = currentPage * countElemOnPage;
        return arr.slice(startElem, endElem).map((item) => {
            return (
                <ProductCard
                    key={item.id}
                    name={item.name}
                    id={item.id}
                    price={item.price}
                    picture={item.productPicture ? item.productPicture.fileContents : null}
                    onAddProductToCart={onAddProductToCart}
                    disabled={cartList.map(item => item.productId).includes(item.id)}/>
            )
        })
    }

    const renderOptionList = (arr) => {
        return arr.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>
            )
        })
    }
    
    const filteredData = useMemo(() => {
        return dataFiltering(productList);
        // eslint-disable-next-line
    }, [productList, search, type, maxPrice]);

    const renderContent = () => {
        if (!filteredData.length && getAllProductsStatus.isSuccess) {
            return (<h1>Товари не знайдено</h1>)
        } else if (getAllProductsStatus.isLoading) {
            return (<Spinner animation="border" variant="info" />)
        } else if (getAllProductsStatus.isError) {
            return (<h1>Помилка під час загрузки</h1>)
        } else if (getAllProductsStatus.isSuccess) {
            return renderCards(filteredData)
        }
    }

    const content = renderContent();

    return (
        <div className="block">
            <Button onClick={() => {
                login({ email: 'admin@gmail.com', password: 'admin' });
            }}>Login</Button>
            <Button onClick={() => {
                logout();
            }}>Logout</Button>
            <div className="container">
                <div className="block__title title">Наші товари</div>
                <Card className="mb-3">
                    <Card.Body>
                    <Form>
                            <Row>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Пошук по назві</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Введіть що ви шукаєте"
                                        value={search}
                                        onChange={(e) => { setCurrentPage(1); setSearch(e.target.value)}}/>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Тип товару</Form.Label>
                                    <Form.Select
                                        onChange={(e) => { setCurrentPage(1); setType(e.target.value)}}
                                        value={type}>
                                        <option value="">Всі</option>
                                        {renderOptionList(typeList)}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Границя ціни</Form.Label>
                                    <Form.Range
                                        value={maxPrice}
                                        min={0}
                                        max={50000}
                                        onChange={(e) =>  { setCurrentPage(1); setMaxPrice(e.target.value)}}/>
                                    <div>Гранична ціна: {maxPrice} ₴</div>
                                </Form.Group>
                        </Row>
                        </Form>
                    </Card.Body>
                </Card>
                <Pagination style={{justifyContent: 'center'}}>
                    <Pagination.First onClick={firstPage}/>
                    <Pagination.Prev onClick={prevPage}/>
                    <Pagination.Item active>{currentPage}</Pagination.Item>
                    <Pagination.Next onClick={() => nextPage(filteredData)}/>
                    <Pagination.Last onClick={() => lastPage(filteredData)}/>
                </Pagination>
                <div className="block__row">
                    {content}
                </div>
                <Pagination className="mt-3" style={{justifyContent: 'center'}}>
                    <Pagination.First onClick={firstPage}/>
                    <Pagination.Prev onClick={prevPage}/>
                    <Pagination.Item active>{currentPage}</Pagination.Item>
                    <Pagination.Next onClick={() => nextPage(filteredData)}/>
                    <Pagination.Last onClick={() => lastPage(filteredData)}/>
                </Pagination>
            </div>
        </div>
    )
}

export default ProductsPage