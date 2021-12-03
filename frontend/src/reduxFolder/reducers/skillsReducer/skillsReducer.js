const initialState = {
    items: [],
    loading: false,
    error: null,
    search: '',
}

export default function serviceSearchReducer(state = initialState, action) {
    switch(action.type) {
        case 'SEARCH_SKILLS_REQUEST':
            return {...state, items: [], loading: true, error: null};
        case 'SEARCH_SKILLS_ERROR':
            const { message } = action.payload;
            return {...state, items: [], loading: false, error: message};
        case 'SEARCH_SKILLS_SUCCESS':
            const { items } = action.payload;
            return {...state, items, loading: false, error: null};
        case 'CHANGE_SEARCH_FIELD':
            const { search } = action.payload;
            if (search === '') {
                return { ...initialState };
            }
            return {...state, search};
        default:
            return state;
    }
}