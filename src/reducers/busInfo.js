export default function busInfo(state = [],action) {
    if (action.type === 'ITEMS_FETCH_DATA_SUCCESS_BUS_INFO' ){
        return action.items;
    }
    if (action.type === 'CLEAR_BUS_INFO'){
        return [];
    }
    return state;
}