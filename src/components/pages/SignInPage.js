import { useState } from "react"
import { Form, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom";
import { authenticationService } from "../../services/auth-service";

const SignInPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onEmailChange(e) {
        setEmail(e.target.value)
    }

    function onPasswordChange(e) {
        setPassword(e.target.value)
    }

    function login(e) {
        e.preventDefault()
        if (!!email && !!password) {
            authenticationService.login(email, password)
            setEmail('')
            setPassword('')
        }
    }

    return (
        <div className="sign">
            <Link to="/" className="header__logo" style={{ color: '#FFFFFF', fontSize: '60px' }}>SUBLIhome</Link>
                <Card border="info" style={{ width: '20rem' }}>
                    <Card.Header as="h3">Вхід в систему</Card.Header>
                    <Card.Body>
                            <Form onSubmit={login}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Електронна пошта</Form.Label>
                                    <Form.Control type="email"
                                        placeholder="Введіть електронну пошта"
                                        value={email}
                                        onChange={onEmailChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control type="password"
                                        placeholder="Введіть пароль"
                                        value={password}
                                        onChange={onPasswordChange}/>
                                </Form.Group>
                                <Button variant="success" type="submit">
                                    Увійти
                                </Button>
                            </Form>
                            <div className="mt-3" style={{textAlign: 'center'}}>
                                Вперше на Sublihome? <Link to='/sign_up'>Зареєструйся</Link>
                            </div>
                    </Card.Body>
                </Card>
        </div>
    )
}

export default SignInPage