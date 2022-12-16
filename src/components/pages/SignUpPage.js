import axios from "axios";
import { useState } from "react"
import { Form, Button, Card, Row, Col, InputGroup } from "react-bootstrap"
import { Link } from "react-router-dom";
import { UserService } from "../../services/sublihome-service";
import { authenticationService } from "../../services/auth-service";
import { errorInterceptor } from "../../helpers/error-interceptor";

const SignUpPage = () => {
    const userService = new UserService(axios.defaults.baseURL)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    async function registration(e) {
        e.preventDefault()
        if (!!email && !!password && !!firstName && !!lastName && !!city && !!street && !!houseNumber && !!phoneNumber && (password === passwordConfirm)) {
            await userService.createUser({
                firstName,
                lastName,
                address: `${city}, ${street}, ${houseNumber}`,
                phoneNumber: `+380${phoneNumber}`,
                email,
                password
            }).then().catch(errorInterceptor)
            await authenticationService.login(email, password);
            e.target.getElementsByTagName('input')[8].style.backgroundColor = '#FFFFFF';
            e.target.getElementsByTagName('input')[8].style.color = '#000000';  
            setFirstName('')
            setLastName('')
            setCity('')
            setStreet('')
            setHouseNumber('')
            setPhoneNumber('')
            setEmail('')
            setPassword('')
            setPasswordConfirm('')
        }
    }
    
    function onConfirmPassword(e) {
        setPasswordConfirm(e.target.value);
        if (password === e.target.value) {
            e.target.style.backgroundColor = '#00FF00';
            e.target.style.color = '#000000';

        } else {
            e.target.style.backgroundColor = '#FF0000';
            e.target.style.color = '#FFFFFF';
        }
    }

    return (
        <div className="sign">
            <Link to="/" className="header__logo" style={{ color: '#FFFFFF', fontSize: '60px' }}>SUBLIhome</Link>
                <Card border="info" style={{ width: '55rem' }}>
                    <Card.Header as="h3">Реєстрація</Card.Header>
                    <Card.Body>
                    <Form onSubmit={registration}>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                            <Form.Label>Імя</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Введіть імя"
                                    onChange={(e) => { setFirstName(e.target.value) }}
                                    value={firstName} />
                            </Form.Group>

                            <Form.Group as={Col}>
                            <Form.Label>Прізвище</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Введіть прізвище"
                                    onChange={(e) => { setLastName(e.target.value) }}
                                    value={lastName}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                            <Form.Label>Місто проживання</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Введіть місто"
                                    onChange={(e) => { setCity(e.target.value) }}
                                    value={city}/>
                            </Form.Group>

                            <Form.Group as={Col}>
                            <Form.Label>Вулиця</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Введіть вулицю"
                                    onChange={(e) => { setStreet(e.target.value) }}
                                    value={street}/>
                            </Form.Group>

                            <Form.Group as={Col} xs={2}>
                            <Form.Label>№ будинку</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Введіть №"
                                    onChange={(e) => { if (e.target.value >= 0) { setHouseNumber(e.target.value) } }}
                                    value={houseNumber}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Номер телефону</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>+380</InputGroup.Text>
                                    <Form.Control
                                    type="tel"
                                    placeholder="Введіть номер телефону"
                                    pattern="[0-9]{9}"
                                    onChange={(e) => { setPhoneNumber(e.target.value) }}
                                    value={phoneNumber} />
                                </InputGroup>
                                </Form.Group>       
                            <Col/>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                            <Form.Label>Електронна пошта</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Введіть електронну пошту"
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    value={email}/>
                            </Form.Group>
                            <Col/>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                            <Form.Label>Пароль</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Введіть пароль"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    value={password}/>
                            </Form.Group>
                            
                            <Form.Group as={Col}>
                            <Form.Label>Підтвердження паролю</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Підтвердіть пароль"
                                    onChange={onConfirmPassword}
                                    value={passwordConfirm}/>
                            </Form.Group>
                        </Row>
                        <Button variant="success" type="submit">
                            Зареєструватись
                        </Button>          
                    </Form>
                    <div className="mt-3" style={{textAlign: 'center'}}>
                        Вже зареєстрований? <Link to='/sign_in'>Увійти в систему</Link>
                    </div>
                    </Card.Body>
                </Card>
        </div>
    )
}

export default SignUpPage