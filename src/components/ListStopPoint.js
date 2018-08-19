import React from 'react';
import {connect} from 'react-redux';
import {itemsFetchDataBusInfo} from "../actions/BusInfo";
class ListStopPoint extends React.Component{
    shouldComponentUpdate(nextProps, nextState) {
        {
            this.props.fetchData(`https://api.tfl.gov.uk/Line/${this.props.id}/StopPoints?app_id=78dd5346&app_key=e3b6fda88d537f6e85ed5aeb85738144`);
        }
    }
    render(){
        return (
            <div>

            </div>
        )
    }
}
export default connect (
    state => ({

    }),
    dispatch => ({
        fetchData: (url) => {
            dispatch(itemsFetchDataBusInfo(url))
        }
    })

)(ListStopPoint)