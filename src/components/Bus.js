import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {itemsFetchDataBusInfo} from "../actions/BusInfo";

class Bus extends React.Component {
    componentDidMount() {
        {
            this.props.fetchData(`https://api.tfl.gov.uk/Line/${this.props.busId}/StopPoints?app_id=78dd5346&app_key=e3b6fda88d537f6e85ed5aeb85738144`);
        }
    }

    render() {
        return (
            <div>
                {this.props.busId}
                {this.props.busInfo.map(bus =>
                    <li key={bus.id}>
                        <Link to={`/stoppoint/${bus.id}`}>
                            {bus.commonName}
                        </Link>
                    </li>
                )}
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        busId: ownProps.match.params.id,
        busInfo: state.busInfo,
    }),
    dispatch => ({
        fetchData: (url) => {
            dispatch(itemsFetchDataBusInfo(url));
        }

    })
)(Bus)