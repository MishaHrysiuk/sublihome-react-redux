import { useDeleteHeroMutation } from '../../api/apiSlice';

const HeroesListItem = ({id, name, price, productType}) => {

    const [deleteHero, {
        isLoading,
        isSuccess
    }] = useDeleteHeroMutation();

    let elementClassName;
    
    switch (productType.id) {
        case 1:
            elementClassName = 'bg-danger';
            break;
        case 2:
            elementClassName = 'bg-primary';
            break;
        case 3:
            elementClassName = 'bg-success';
            break;
        default:
            elementClassName = 'bg-warning';
    }

    const renderInfo = () => {
        if (isLoading) {
            return <h3 className="card-title">Deleting...</h3>
        }
        else if (isSuccess) {
            return <h3 className="card-title">Deleted</h3>
        } else {
            return (
                <>
                    <h3 className="card-title">{name}</h3>
                    <p className="card-text">{price}</p>
                </>)
        }
    }

    return (
        <li 
            className={`card flex-row mb-4 shadow-lg text-white bg-gradient ${elementClassName}`}>
            <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg" 
                 className="img-fluid w-25 d-inline" 
                 alt="unknown hero" 
                 style={{'objectFit': 'cover'}}/>
            <div className="card-body">  
                {renderInfo()}
            </div>
            <span onClick={() => deleteHero(id)} 
                className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button type="button" className="btn-close btn-close" aria-label="Close"></button>
            </span>
        </li>
    )
}

export default HeroesListItem;