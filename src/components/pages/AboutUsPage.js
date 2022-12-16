import { Card } from "react-bootstrap"
import { authenticationService } from "../../services/auth-service"

const AboutUsPage = () => {
    return (
        <div className="block">
            <div className="container">
                <div className="block__title title">Про проект</div>
                <div className="block__row">
                    <Card>
                        <Card.Body style= {{textAlign: 'center'}}>
                            <Card.Title>Про проект</Card.Title>
                            <Card.Text>Цей проект на дипломну бакалаврську роботу підготував <br/>
                                студент КПІ, ФІОТ, групи ІВ-83 <br/>
                                Грисюк Михайло</Card.Text>
                        </Card.Body>
                    </Card>
                    </div>
            </div>
        </div>
    )
}

export default AboutUsPage