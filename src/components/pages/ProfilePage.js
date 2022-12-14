import { Button, Card, Form, Col, Row, InputGroup, Spinner } from "react-bootstrap"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useGetUserQuery,
    useUpdateUserMutation,
    useUpdateUserPasswordMutation
} from "../../api/apiSlice";

import { useAuth } from "../../hooks/auth.hook";

const ProfilePage = () => {
    const { currentUserId, currentUserIsAdmin, logout } = useAuth()
    const {
        data: user,
        isLoading,
        isSuccess
    } = useGetUserQuery(currentUserId);
    const [updateUser] = useUpdateUserMutation();
    const [updateUserPassword] = useUpdateUserPasswordMutation();

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

    const onUserLoaded = (user) => {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setCity(user.address ? user.address.split(', ')[0] : '')
        setStreet(user.address ? user.address.split(', ')[1] : '')
        setHouseNumber(user.address ? +user.address.split(', ')[2] : 0)
        setPhoneNumber(user.phoneNumber.slice(4))
        setEmail(user.email)
    }

    useEffect(() => {
        if (isSuccess) {
            onUserLoaded(user);
        }
        // eslint-disable-next-line
    }, [user])
    

    function onUpdateUser(e) {
        e.preventDefault()
        if ((!!email && !!firstName && !!lastName && !!city && !!street && !!houseNumber && !!phoneNumber)) {
            updateUser({
                id: currentUserId,
                firstName,
                lastName,
                address: `${city}, ${street}, ${houseNumber}`,
                phoneNumber: `+380${phoneNumber}`,
                email})
                .unwrap()
                .then(res => { alert('Saved!') })
        }
    }
    
    function onUpdatePassword(e) {
        e.preventDefault()
        console.log(e.target.getElementsByTagName('input'))
        if ((!!oldPassword && !!password && (password === passwordConfirm))) {
            updateUserPassword({
                userId: currentUserId,
                oldPassword,
                newPassword: password
            })
                .unwrap()
                .then(res => {
                    alert('Password change')
                    e.target.getElementsByTagName('input')[2].style.backgroundColor = '#FFFFFF';
                    e.target.getElementsByTagName('input')[2].style.color = '#000000';  
                    setOldPassword('')
                    setPassword('')
                    setPasswordConfirm('')
                })
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
                        <Card.Header as="h3">?????????????????? ??????????????</Card.Header>
                        <Card.Body>
                        <Form onSubmit={onUpdateUser}>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                <Form.Label>??????</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="?????????????? ??????"
                                        onChange={(e) => { setFirstName(e.target.value) }}
                                        value={firstName} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                <Form.Label>????????????????</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="?????????????? ????????????????"
                                        onChange={(e) => { setLastName(e.target.value) }}
                                        value={lastName}/>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                <Form.Label>?????????? ????????????????????</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="?????????????? ??????????"
                                        onChange={(e) => { setCity(e.target.value) }}
                                        value={city}/>
                                </Form.Group>

                                <Form.Group as={Col}>
                                <Form.Label>????????????</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="?????????????? ????????????"
                                        onChange={(e) => { setStreet(e.target.value) }}
                                        value={street}/>
                                </Form.Group>

                                <Form.Group as={Col} xs={2}>
                                <Form.Label>??? ??????????????</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="?????????????? ???"
                                        onChange={(e) => { if (e.target.value >= 0) { setHouseNumber(e.target.value) } }}
                                        value={houseNumber}/>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>?????????? ????????????????</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>+380</InputGroup.Text>
                                        <Form.Control
                                        type="tel"
                                        placeholder="?????????????? ?????????? ????????????????"
                                        pattern="[0-9]{9}"
                                        onChange={(e) => { setPhoneNumber(e.target.value) }}
                                        value={phoneNumber} />
                                    </InputGroup>
                                    </Form.Group>       
                                <Col/>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                <Form.Label>???????????????????? ??????????</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="?????????????? ???????????????????? ??????????"
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        value={email}/>
                                </Form.Group>
                                <Col/>
                            </Row>
                            <Button className="m-2" variant="success" type="submit">???????????????? ??????????</Button>
                    </Form>
                    <Card.Title>?????????? ????????????</Card.Title>
                    <Form onSubmit={onUpdatePassword}>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                <Form.Label>???????????? ????????????</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="?????????????? ???????????? ????????????"
                                        onChange={(e) => { setOldPassword(e.target.value) }}
                                        value={oldPassword}/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                <Form.Label>?????????? ????????????</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="?????????????? ?????????? ????????????"
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        value={password}/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                <Form.Label>?????????????????????????? ????????????</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="?????????????????????? ????????????"
                                        onChange={onConfirmPassword}
                                        value={passwordConfirm}/>
                                </Form.Group>
                        </Row>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button style={{justifySelf: 'center'}} className="m-2" variant="success" type="submit">?????????????? ????????????</Button>
                            { currentUserIsAdmin ? <Button onClick={() => navigate('/admin')} className="m-2" variant="warning">?????????? ????????????</Button> : null}
                            <Button style={{alignSelf: 'center'}} className="m-2" variant="danger" onClick={logout}>?????????? ?? ??????????????</Button>
                        </div>
                    </Form>
                        </Card.Body>
                    </Card>
        )
    }

    const card = getCard();
    const spinner = isLoading ? <Spinner animation="border" variant="info" /> : null;
    const content = !isLoading && isSuccess ? card : null;


    return (
        <div className="block">
            <div className="container">
                <div className="block__title title">??????????????</div>
                <div className="block__column">
                    {spinner}
                    {content}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage