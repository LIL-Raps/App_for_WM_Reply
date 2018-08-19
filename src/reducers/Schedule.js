export default function schedule(state = [],action) {
    if (action.type === 'ITEMS_FETCH_DATA_SUCCESS_SCHEDULE' ){
        return action.items;
    }
    if (action.type === 'CLEAR_SCHEDULS'){
        return [];
    }
    if (action.type === 'ITEMS_HAS_ERRORED'){
        return action.hasErrored
    }
    return state;
}