export function itemsFetchDataStopPointInfo(url) {
    return (dispatch) => {
        fetch(url)
            .then((response) => {
                return response;
            })
            .then((response) => response.json())
            .then((items)=>dispatch(itemsFetchDataSuccessStopPointInfo(items)))
    }
}
export function itemsFetchDataSuccessStopPointInfo(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS_STOP_POINT_INFO',
        items
    }
}