export function itemsFetchDataBusInfo(url) {
    return (dispatch) => {
        fetch(url)
            .then((response) => {
                return response;
            })
            .then((response) => response.json())
            .then((items)=>dispatch(itemsFetchDataSuccessBusInfo(items)))
    }
}
export function itemsFetchDataSuccessBusInfo(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS_BUS_INFO',
        items
    }
}