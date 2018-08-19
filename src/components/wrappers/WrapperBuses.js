import React from 'react';
import {Link} from 'react-router-dom';
import {itemsFetchData} from "../../actions/action";
import {connect} from "react-redux";
import bus from "../../reducers/reducer";
import {itemsFetchDataBusInfo} from "../../actions/BusInfo";
import {itemsFetchDataSchedule} from '../../actions/Schedule'
import styled from 'styled-components';
const Line = styled.div`
position: absolute;
left: 50%;
top: 100%;
width: 0;
height: 0;
border: 18px solid transparent; 
border-top-color: rgb(40, 167, 69);  
border-bottom: 0;
transform: translateX(-50%)
`;

class Wrapper extends React.Component {

    constructor(props) {
        super(props);
        this.selectTransport = this.selectTransport.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    state = {
        progressBar: '0%',
        scheduleCurrent: null,
        numberCurrent: null,
        selectTransportType: null,
        reverse: false,
        isVisible: false
    };

    removeTag(i) {
        this.props.scheduleData(`https://api.tfl.gov.uk/Line/${this.state.numberCurrent}/Timetable/${i}?app_key=e3b6fda88d537f6e85ed5aeb85738144&app_id=78dd5346
`);
        this.setState({
            progressBar: '100%'
        })
    }

    onChange(e) {
        this.props.clearScheduls();
        this.setState({
            numberCurrent: e.target.value,
            progressBar: '50%'
        });
        this.props.fetchDataBusInfo(`https://api.tfl.gov.uk/Line/${e.target.value}/StopPoints?app_id=78dd5346&app_key=e3b6fda88d537f6e85ed5aeb85738144`);
    }

    selectTransport() {
        this.setState({
            selectTransportType: 'bus',
            progressBar: '25%',
        });
    }

    componentDidMount() {
        {
            this.props.fetchData('https://api.tfl.gov.uk/Line/Mode/bus?app_id=78dd5346&app_key=e3b6fda88d537f6e85ed5aeb85738144')
        }

    }

    render() {
        const jumb = this.state.isVisible? ' jumbotron':'';
        const mass = this.props.busStopPoint.slice();
        return (
            <div>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                         style={{width: this.state.progressBar}}></div>
                </div>
                <div className="text-center">
                    <h2>Select transport</h2>
                    <button type="button" className="btn btn-outline-primary" onClick={this.selectTransport}>
                        BUS
                    </button>
                    <h2>Select line</h2>
                    <select className="custom-select" onChange={this.onChange}>
                        {this.state.selectTransportType === 'bus' ? this.props.items.map((item, index) =>
                            <option value={item.id} key={item.id}>{item.id}</option>
                        ) : <option selected disabled>Select transport</option>}
                    </select>

                    <h2>Select direction</h2>

                    <div className="m-2">
                        <button type="button" class="btn btn-primary" onClick={() => {
                            this.setState({reverse: false, isVisible: true, progressBar: '75%'})
                        }}>  {this.props.busStopPoint.length > 0 ? this.props.busStopPoint[0].commonName : ''} to {this.props.busStopPoint.length > 0 ? this.props.busStopPoint[this.props.busStopPoint.length - 1].commonName : ''}</button>
                    </div>
                    <div className="m-2">
                        <button type="button" class="btn btn-primary" onClick={() => {
                            this.setState({reverse: true, isVisible: true, progressBar: '75%'})
                        }}> {this.props.busStopPoint.length > 0 ? this.props.busStopPoint[this.props.busStopPoint.length - 1].commonName : ''} to {this.props.busStopPoint.length > 0 ? this.props.busStopPoint[0].commonName : ''} </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {this.state.isVisible ? this.state.reverse ? mass.reverse().map((busPoint,index) =>
                            <div className="card text-white bg-success mb-3 " style={{maxWidth: '350px'}}
                                 key={busPoint.id}>
                                    <div className="card-header text-white">{busPoint.commonName}</div>
                                <div className="card-body p-0">
                                    <button type="button" class="btn btn-success p-1" onClick={() => this.removeTag(busPoint.id)}>Find out the schedule</button>
                                   <button type="button" class="btn btn-success p-1 float-right"> <Link className="text-white"  to={'/stoppoint/' + busPoint.id}  onClick={() => this.removeTag(busPoint.id)}>Show on the map</Link></button>
                                </div>
                                {mass.length-1 !== index?<Line><br/></Line>:''}
                            </div>) : mass.map((busPoint,index) =>
                            <div className="card text-white bg-success mb-3 " style={{maxWidth: '350px'}}
                                 key={busPoint.id}>
                                <div className="card-header text-white">{busPoint.commonName}</div>
                                <div className="card-body p-0">
                                    <button type="button" class="btn btn-success p-1" onClick={() => this.removeTag(busPoint.id)}>Find out the schedule</button>
                                    <button type="button" class="btn btn-success p-1 float-right"> <Link className="text-white"  to={'/stoppoint/' + busPoint.id}  onClick={() => this.removeTag(busPoint.id)}>Show on the map</Link></button>
                                </div>
                                {mass.length-1 !== index?<Line><br/></Line>:''}
                            </div>) : ''}
                    </div>
                    <div className="col-md-6">
                        {typeof this.props.schedule === 'object' ? this.props.schedule['routes'][0]['schedules'].map((schedule, index) =>
                            <button type="button" className="btn btn-outline-primary m-3"
                                    onClick={() => this.setState({scheduleCurrent: index})}>{schedule.name}</button>) : ''}
                        <div className={'row'+jumb}>
                          {typeof this.props.schedule === 'object' ? typeof this.props.schedule['routes'][0]['schedules'][this.state.scheduleCurrent] === 'object' ? <h2 className="col-md-12">Schedule for  {this.props.schedule['routes'][0]['schedules'][this.state.scheduleCurrent]['name']} <hr class="my-4"/></h2>:'':''}
                            {typeof this.props.schedule === 'object' ? typeof this.props.schedule['routes'][0]['schedules'][this.state.scheduleCurrent] === 'object' ? this.props.schedule['routes'][0]['schedules'][this.state.scheduleCurrent]['knownJourneys'].map(journeys =>
                                <div className="col-md-2">{journeys.hour}<sup>{journeys.minute}</sup></div>) : '' : ''}
                            {typeof this.props.scheduleDatas === 'object' ? this.props.scheduleDatas['httpStatusCode'] === 400 ?
                                <div className="col-md-12"><span class="badge badge-danger">Danger</span>
                                </div> : '' : ''}
                        </div>
                        {console.log(this.props.scheduleDatas)}

                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        schedule: state.schedule.timetable,
        scheduleDatas: state.schedule,
        items: state.bus,
        busStopPoint: state.busInfo,
    }),
    dispatch => ({
        fetchData: (url) => {
            dispatch(itemsFetchData(url));
        },
        scheduleData: (url) => {
            dispatch(itemsFetchDataSchedule(url));
        },
        fetchDataBusInfo: (url) => {
            dispatch(itemsFetchDataBusInfo(url))
        },
        clearScheduls: () => {
            dispatch({type: 'CLEAR_SCHEDULS'})
        }
    })
)(Wrapper)