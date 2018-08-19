export function itemsFetchDataSchedule(url) {
    return (dispatch) => {
        fetch(url)
            .then((response) => {
                return response;
            })
            .then((response) => response.json())
            .then((items)=>dispatch(itemsFetchDataSuccessSchedule(items)))
            .catch(()=> dispatch(itemsHasErrored(true)));
    }
}
export function itemsFetchDataSuccessSchedule(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS_SCHEDULE',
        items
    }
}
export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}