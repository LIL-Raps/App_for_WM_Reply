import React from 'react';
import {connect} from 'react-redux';
import {itemsFetchDataStopPointInfo} from "../actions/StopPointInfo";
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import {Link} from 'react-router-dom';

class StopPoint extends React.Component {
    state = {
        isMarkerShow: false,
    };

    componentWillMount() {
        this.props.fetchData(`https://api.tfl.gov.uk/StopPoint/${this.props.stopPointId}?app_key=e3b6fda88d537f6e85ed5aeb85738144&app_id=78dd5346`);
    }

    componentDidMount() {
        this.setState({
            isMarkerShow: true,
        })
    }

    render() {
        const MyMapComponent = withScriptjs(withGoogleMap((props) => <GoogleMap
            defaultZoom={15}
            defaultCenter={{lat: props.lat, lng: props.lng}}
        >{props.isMarkerShown && <Marker position={{lat: props.lat, lng: props.lng}}/>}</GoogleMap>));
        return (
            <div className="">
                <div className="text-center jumbotron">
                    <h1 className="display-1 ">
                        London Assistant
                        <hr className="my-4"/>
                        {this.props.stopPointinfo.commonName}
                    </h1>
                </div>
                <div className="text-center"><h1>All lines in the station</h1>
                <div className="container">
                    <div className="row m-5">
                        {Array.isArray(this.props.items) ? this.props.items.map(line => <div className="col-2"
                                                                                             key={line.id}>{line.id}</div>) : null}
                    </div>
                    <button type="button" className="btn btn-outline-primary m-2" >
                        <Link to={`/`}>TO MAIN</Link>
                    </button>
                </div>
                </div>
                <MyMapComponent isMarkerShown={this.state.isMarkerShow}
                                lat={this.props.lat}
                                lng={this.props.lng}
                                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{height: `100%`}}/>}
                                containerElement={<div style={{height: `400px`}}/>}
                                mapElement={<div style={{height: `100%`}}/>}
                />
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        stopPointinfo: state.stopPointInfo,
        items: state.stopPointInfo.lines,
        lat: state.stopPointInfo.lat,
        lng: state.stopPointInfo.lon,
        stopPointId: ownProps.match.params.id,
    }),
    dispatch => ({
        fetchData: (url) => {
            dispatch(itemsFetchDataStopPointInfo(url))
        }
    })
)(StopPoint)