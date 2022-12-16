import axios from "axios";
import { Button, Card, Form, Col, Row, InputGroup, Spinner } from "react-bootstrap"
import DefaultsAxios from "../../helpers/jwt-interceptor";
import { authenticationService } from "../../services/auth-service"
import { UserService } from "../../services/sublihome-service";
import { useEffect, useState } from "react";
import { errorInterceptor } from "../../helpers/error-interceptor";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const userService = new UserService(axios.defaults.baseURL, DefaultsAxios);
    const currentUserId = authenticationService.currentUserId;
    const isAdmin = authenticationService.currentUserIsAdmin;

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = () => {
        userService.getUser(currentUserId)
            .then(onUserLoaded)
            .catch(err => {
                setLoading(false);
                errorInterceptor(err)
            })
    }

    const onUserLoaded = (user) => {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setCity(user.address ? user.address.split(', ')[0] : '')
        setStreet(user.address ? user.address.split(', ')[1] : '')
        setHouseNumber(user.address ? +user.address.split(', ')[2] : 0)
        setPhoneNumber(user.phoneNumber.slice(4))
        setEmail(user.email)
        setLoading(false)
    }

    function onUpdateUser(e) {
        e.preventDefault()
        if ((!!email && !!firstName && !!lastName && !!city && !!street && !!houseNumber && !!phoneNumber)) {
            userService.updateUser({
                id: currentUserId,
                firstName,
                lastName,
                address: `${city}, ${street}, ${houseNumber}`,
                phoneNumber: `+380${phoneNumber}`,
                email
            }).then(res => {
                alert('Saved!')
            }).catch(errorInterceptor)
        }
    }
    
    function onUpdatePassword(e) {
        e.preventDefault()
        console.log(e.target.getElementsByTagName('input'))
        if ((!!oldPassword && !!password && (password === passwordConfirm))) {
            userService.updateUserPassword({
                userId: currentUserId,
                oldPassword,
                newPassword: password
            }).then(res => {
                alert('Password change')
                e.target.getElementsByTagName('input')[2].style.backgroundColor = '#FFFFFF';
                e.target.getElementsByTagName('input')[2].style.color = '#000000';  
                setOldPassword('')
                setPassword('')
                setPasswordConfirm('')
            }).catch(errorInterceptor)
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

    const getCard = () => {
        return (
            <Card border="info" style={{ width: '55rem' }}>
                        <Card.Header as="h3">Настройка профілю</Card.Header>
                        <Card.Body>
                        <Form onSubmit={onUpdateUser}>
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
                            <Button className="m-2" variant="success" type="submit">Зберегти зміни</Button>
                    </Form>
                    <Card.Title>Зміна паролю</Card.Title>
                    <Form onSubmit={onUpdatePassword}>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                <Form.Label>Старий пароль</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Введіть старий пароль"
                                        onChange={(e) => { setOldPassword(e.target.value) }}
                                        value={oldPassword}/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                <Form.Label>Новий пароль</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Введіть новий пароль"
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
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button style={{justifySelf: 'center'}} className="m-2" variant="success" type="submit">Змінити пароль</Button>
                            { isAdmin ? <Button onClick={() => navigate('/admin')} className="m-2" variant="warning">Адмін панель</Button> : null}
                            <Button style={{alignSelf: 'center'}} className="m-2" variant="danger" onClick={authenticationService.logout}>Вийти з профіля</Button>
                        </div>
                    </Form>
                        </Card.Body>
                    </Card>
        )
    }

    const card = getCard();
    const spinner = loading ? <Spinner animation="border" variant="info" /> : null;
    const content = !loading ? card : null;


    return (
        <div className="block">
            <div className="container">
                <div className="block__title title">Профіль</div>
                <div className="block__column">
                    {spinner}
                    {content}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage