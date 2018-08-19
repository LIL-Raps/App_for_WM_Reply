export function itemsFetchData(url) {
    return (dispatch) => {
        fetch(url)
            .then((response) => {
                return response;
            })
            .then((response) => response.json())
            .then((items)=>dispatch(itemsFetchDataSuccess(items)))
    }
}

export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS_BUS',
        items
    };
}
