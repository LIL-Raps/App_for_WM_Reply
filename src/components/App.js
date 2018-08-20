import React from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import Wrapper from './wrappers/WrapperBuses'
const Container = styled.div`
background-color: rgba(0,0,128,${1/document.documentElement.scrollHeight});
`;
class App extends React.Component {
    render() {
        return (
            <Container className="container ">
                <div className="text-center jumbotron">
                    <h1 className="display-1 ">
                        London Assistant
                        <hr className="my-4"/>
                    </h1>
                </div>
                <Wrapper></Wrapper>
            </Container>
        );
    }
}
export default connect(
    state => ({
        items: state.bus
    }),
    dispatch => ({

    })
)(App)