import React from 'react';
import {connect} from 'react-redux';
import {itemsFetchDataStopPointInfo} from "../actions/StopPointInfo";
import {withScriptjs,withGoogleMap,GoogleMap,Marker} from 'react-google-maps';

class StopPoint extends React.Component {
    state = {
      isMarkerShow: false,
    };
    componentWillMount() {
        {
            this.props.fetchData(`https://api.tfl.gov.uk/StopPoint/${this.props.stopPointId}?app_key=e3b6fda88d537f6e85ed5aeb85738144&app_id=78dd5346
`);
        }

    }
    componentDidMount(){
        this.setState({
            isMarkerShow:true,
        })
    }

    render() {
        const MyMapComponent = withScriptjs(withGoogleMap((props) => <GoogleMap
            defaultZoom={20}
            defaultCenter={{lat:props.lat,lng:props.lng }}
        >{props.isMarkerShown && <Marker position={{ lat: props.lat , lng:props.lng }} />}</GoogleMap>));
        return (
            <div>
                <MyMapComponent isMarkerShown={this.state.isMarkerShow}
                                lat={this.props.lat}
                                lng={this.props.lng}
                                                     googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                                     loadingElement={<div style={{ height: `100%` }} />}
                                                     containerElement={<div style={{ height: `400px` }} />}
                                                     mapElement={<div style={{ height: `100%` }} />}
                />
                {this.props.stopPointId}
                {console.log(this.props.items)}
                {Array.isArray(this.props.items)? this.props.items.map(line=><li>{line.id}</li>):''}
                </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
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