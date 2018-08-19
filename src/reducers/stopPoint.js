export default function stopPointInfo(state = [],action) {
    if (action.type === 'ITEMS_FETCH_DATA_SUCCESS_STOP_POINT_INFO' ){
        return action.items;
    }
    return state;
}