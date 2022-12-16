import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { activeFilterChanged } from '../../api/filtersSlice';
import { useGetAllProductTypesQuery } from '../../api/apiSlice';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {

    const { activeFilter } = useSelector(state => state.filters);
    const {
        data: filters = [],
        isLoading,
        isError
    } = useGetAllProductTypesQuery() 

    const dispatch = useDispatch();

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return arr.map(({name, id}) => {

            let elementClassName;
    
            switch (id) {
                case 1:
                    elementClassName = 'btn-outline-danger';
                    break;
                case 2:
                    elementClassName = 'btn-outline-primary';
                    break;
                case 3:
                    elementClassName = 'btn-outline-success';
                    break;
                default:
                    elementClassName = 'btn-outline-dark';
            }

            const btnClass = classNames('btn', elementClassName, {
                'active': id === activeFilter
            });
            
            return <button 
                        key={id} 
                        id={id} 
                        className={btnClass}
                        onClick={() => dispatch(activeFilterChanged(id))}
                        >{name}</button>
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по типу</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;