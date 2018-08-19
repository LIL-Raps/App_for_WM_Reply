
export default function bus(state = [], action) {
    if (action.type === 'ITEMS_FETCH_DATA_SUCCESS_BUS'){
        return action.items;
    }
    return state;
}
