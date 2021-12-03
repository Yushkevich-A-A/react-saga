import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchField } from '../reduxFolder/actions/actions';

function Skills(props) {
    const { search, items, loading, error } = useSelector( state => state.searchReducer);
    const dispatch = useDispatch();
    
    const handleSearch = (e) => {
        const { value } = e.target;
        dispatch(changeSearchField(value));
    }

    const hasQuery = search.trim() !== '';

    return (
        <>
            <div>
                <input type="search" value={search} onChange={handleSearch}/>
            </div>
            {!hasQuery && <div>Type something to search</div>}
            {hasQuery && loading && <div>Searching...</div>}
            {error ? <div>Error</div> : <ul>
                    {items.map( item => <li key={item.id}>{item.name}</li>)}
                </ul>}
        </>
    )
}

export default Skills;