import { Card, Button } from "react-bootstrap"
import Bg from '../../resources/img/Background.png';
import './product-card.scss'

const ProductCard = (props) => {
    const { name, price, id, picture, disabled, onAddProductToCart} = props;
    const image = picture ? `data:image/png;base64,${props.picture}` : `${Bg}`;
    return (
        <Card style={{ width: '18rem', margin: 5, border: '2px solid #162e44' }}>
            <Card.Img variant="top" src={image}/>
            <Card.Body className="card__body">
                <div>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{price} ₴</Card.Text>
                </div>
                <Button disabled={disabled} onClick={() => onAddProductToCart(id)} className="card__button" variant={disabled ? "success" : "primary"}>{disabled ? "Добавлено" : "В корзину"}</Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCard