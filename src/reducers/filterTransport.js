const initialState = [];
export default function filterTransport(state = initialState, action) {
    if (action.type === 'FIND_TRACK') {
        return action.payload;
    }
    return state;
}