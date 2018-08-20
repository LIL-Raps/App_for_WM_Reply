import React from 'react';
import styled from 'styled-components';
export default class Line extends React.Component {
    render(){
        const Line = styled.div`
position: absolute;
left: 50%;
top: 100%;
width: 0;
height: 0;
transition: all .5s;
border: 18px solid transparent; 
border-top-color: ${this.props.color};  
border-bottom: 0;
transform: translateX(-50%)
`;
        return(
            <Line></Line>
        )
    }
}