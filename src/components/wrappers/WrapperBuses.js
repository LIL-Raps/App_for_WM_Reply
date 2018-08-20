import React from 'react';
import {Link} from 'react-router-dom';
import {itemsFetchData} from "../../actions/action";
import {connect} from "react-redux";
import {itemsFetchDataBusInfo} from "../../actions/BusInfo";
import {itemsFetchDataSchedule} from '../../actions/Schedule'
import Line from '../Line';

class Wrapper extends React.Component {

    constructor(props) {
        super(props);
        this.selectTransport = this.selectTransport.bind(this);
        this.onChange = this.onChange.bind(this);
        this.findTransp = this.findTransp.bind(this);
    }

    state = {
        isIdMatches: false,
        isVisibleDays:false,
        isVisibleSelect:false,
        isVisibleDirection:false,
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
            progressBar: '100%',
            isVisibleDays:true,
        })
    }
    findTransp(){
        this.props.onFindTransport(this.searchInput.value);

    }
    onChange(e) {
        this.props.clearScheduls();
        this.setState({
            numberCurrent: e.target.value,
            progressBar: '50%',
            isVisibleDirection:true
        });
        this.props.fetchDataBusInfo(`https://api.tfl.gov.uk/Line/${e.target.value}/StopPoints?app_id=78dd5346&app_key=e3b6fda88d537f6e85ed5aeb85738144`);
    }
    selectTransport(bus) {
        if (bus === 'tube'){
            this.props.clearScheduls();
            this.props.clearScheduls();
        }
        this.props.fetchData(`https://api.tfl.gov.uk/Line/Mode/${bus}?app_id=78dd5346&app_key=e3b6fda88d537f6e85ed5aeb85738144`)
        this.setState({
            selectTransportType: bus,
            progressBar: '25%',
            isVisibleSelect:true
        });
    }



    render() {
        const jumb = this.state.isVisible && this.state.selectTransportType !== 'tube'? ' jumbotron':'';
        const mass = this.props.busStopPoint.slice();
        const search = (busPoint) => {return Array.isArray(this.props.rezultsearch)?this.props.rezultsearch.map(rez => busPoint.id===rez.id? '1': '2' ):' '};
        return (
            <div>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                         style={{width: this.state.progressBar}}></div>
                </div>
                <div className="text-center">
                    <div className="m-3">
                    <h1>Select transport</h1>
                    <button type="button" className="btn btn-outline-primary m-2" onClick={()=> this.selectTransport('bus')}>
                        BUS
                    </button>
                        <button type="button" className="btn btn-outline-danger m-2" onClick={()=> this.selectTransport('tube')}>
                            TUBE
                        </button>
                    </div>
                    {this.state.isVisibleSelect?<div className="m-3"><h1>Select line</h1>
                        <select className="custom-select" onChange={this.onChange}>
                            {this.state.selectTransportType === 'bus' || this.state.selectTransportType==='tube'? this.props.items.map((item, index) =>
                                <option value={item.id} key={item.id}>{item.id}</option>
                            ) : <option selected disabled>Select transport</option>}
                        </select></div>:null}


                    {this.state.isVisibleDirection?<div className="m-3"><h1>Select direction</h1><div className="m-2">
                        <button type="button" className="btn btn-primary" onClick={() => {
                            this.setState({reverse: false, isVisible: true, progressBar: '75%'})
                        }}>  {this.props.busStopPoint.length > 0 ? this.props.busStopPoint[0].commonName : ''} to {this.props.busStopPoint.length > 0 ? this.props.busStopPoint[this.props.busStopPoint.length - 1].commonName : ''}</button>
                    </div>
                        <div className="m-3">
                            <button type="button" className="btn btn-primary" onClick={() => {
                                this.setState({reverse: true, isVisible: true, progressBar: '75%'})
                            }}> {this.props.busStopPoint.length > 0 ? this.props.busStopPoint[this.props.busStopPoint.length - 1].commonName : ''} to {this.props.busStopPoint.length > 0 ? this.props.busStopPoint[0].commonName : ''} </button>
                        </div></div>:null}


                </div>
                <div className="row m-3">
                    <div className="col-md-6">
                        {this.state.isVisible ? <div className="form-group">
                            <label className="col-form-label" htmlfor="inputDefault"><h4>SEARCH FOR STOPS</h4></label>
                            <input type="text" className="form-control" placeholder="Name of the stop" id="inputDefault" ref={(input) => {this.searchInput = input}}/>
                            <button type="button" className="btn btn-outline-primary m-2" onClick={this.findTransp}>
                                SEARCH
                            </button>
                        </div>:null}
                        {console.log(this.props.rezultsearch)}
                        {this.state.isVisible ? this.state.reverse ? mass.reverse().map((busPoint,index) =>
                            <div className={'card text-white bg-success mb-3' + Array.isArray(search(busPoint))?search(busPoint).includes('1')?' card text-white bg-danger mb-3':'card text-white bg-success mb-3':''} style={{maxWidth: '350px',transition:'all .5s'}}
                                 key={busPoint.id}>
                                {console.log(Array.isArray(search(busPoint))?search(busPoint).includes('1')?'yes':'ni':'')}
                                    <div className="card-header text-white">{busPoint.commonName}</div>
                                <div className="card-body p-0">
                                    <button style={{transition:'all .5s'}} type="button" className={'btn btn-success p-1'+ Array.isArray(search(busPoint))?search(busPoint).includes('1')?' btn btn-danger p-1':' btn btn-success p-1':''} onClick={() => this.removeTag(busPoint.id)}>Find out the schedule</button>
                                   <button style={{transition:'all .5s'}} type="button" className={'btn btn-success p-1 float-right'+Array.isArray(search(busPoint))?search(busPoint).includes('1')?' btn btn-danger p-1 float-right':' btn btn-success p-1 float-right':''}> <Link className="text-white"  to={'/stoppoint/' + busPoint.id}  onClick={() => this.removeTag(busPoint.id)}>Show on the map</Link></button>
                                </div>
                                {mass.length-1 !== index?<Line color={"rgb(40, 167, 69)"+Array.isArray(search(busPoint))?search(busPoint).includes('1')?' rgb(220, 53, 69)':' rgb(40, 167, 69)':''}><br/></Line>:''}
                            </div>) : mass.map((busPoint,index) =>
                            <div className={'card text-white bg-success mb-3' + Array.isArray(search(busPoint))?search(busPoint).includes('1')?' card text-white bg-danger mb-3':'card text-white bg-success mb-3':''} style={{maxWidth: '350px',transition:'all .5s'}}
                                 key={busPoint.id}>
                                {console.log(Array.isArray(search(busPoint))?search(busPoint).includes('1')?'yes':'ni':'')}
                                <div className="card-header text-white">{busPoint.commonName}</div>
                                <div className="card-body p-0">
                                    <button style={{transition:'all .5s'}} type="button" className={'btn btn-success p-1'+ Array.isArray(search(busPoint))?search(busPoint).includes('1')?' btn btn-danger p-1':' btn btn-success p-1':''} onClick={() => this.removeTag(busPoint.id)}>Find out the schedule</button>
                                    <button style={{transition:'all .5s'}} type="button" className={'btn btn-success p-1 float-right'+Array.isArray(search(busPoint))?search(busPoint).includes('1')?' btn btn-danger p-1 float-right':' btn btn-success p-1 float-right':''}> <Link className="text-white"  to={'/stoppoint/' + busPoint.id}  onClick={() => this.removeTag(busPoint.id)}>Show on the map</Link></button>
                                </div>
                                {mass.length-1 !== index?<Line color={"rgb(40, 167, 69)"+Array.isArray(search(busPoint))?search(busPoint).includes('1')?' rgb(220, 53, 69)':' rgb(40, 167, 69)':''}><br/></Line>:''}
                            </div>) : ''}
                    </div>
                    <div className="col-md-6">
                        {this.state.isVisibleDays && this.state.selectTransportType !== 'tube'? <h2 className="col-md-12 mt-4">Select days of the week<hr className="my-4"/></h2>:''}
                        {typeof this.props.schedule === 'object' ? this.props.schedule['routes'][0]['schedules'].map((schedule, index) =>
                            <button key={index} type="button" className="btn btn-outline-primary m-3"
                                    onClick={() => this.setState({scheduleCurrent: index})}>{schedule.name}</button>) : ''}
                        <div className={'row'+jumb}>
                          {typeof this.props.schedule === 'object' ? typeof this.props.schedule['routes'][0]['schedules'][this.state.scheduleCurrent] === 'object' ? <h2 className="col-md-12">Schedule for  {this.props.schedule['routes'][0]['schedules'][this.state.scheduleCurrent]['name']} <hr className="my-4"/></h2>:'':''}
                            {typeof this.props.schedule === 'object' ? typeof this.props.schedule['routes'][0]['schedules'][this.state.scheduleCurrent] === 'object' ? this.props.schedule['routes'][0]['schedules'][this.state.scheduleCurrent]['knownJourneys'].map(journeys =>
                                <div key={journeys.hour+journeys.minute} className="col-md-2">{journeys.hour}<sup>{journeys.minute}</sup></div>) : '' : ''}
                            {typeof this.props.scheduleDatas === 'object' ? this.props.scheduleDatas['httpStatusCode'] === 400 ?
                                <div className="col-md-12"><span className="badge badge-danger">Danger</span>
                                </div> : '' : ''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        rezultsearch: state.filterTransport.length>0? state.busInfo.filter(rez => rez.commonName.includes(state.filterTransport)):null,
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
        },
        onFindTransport: (search) =>{
            dispatch({type:'FIND_TRACK',payload:search})
        }
    })
)(Wrapper)