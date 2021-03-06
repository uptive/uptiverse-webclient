import './InterviewSection.css';
import React, { PropTypes } from 'react';
import CircularContainer from '../../CircularContainer';
import FontAwesome from 'react-fontawesome';
const diameter = 80;
const spacing = 5;

const activeStyle = {borderWidth:2};
const acceptedStyle = {borderWidth:2};
const ongoingStyle = {borderWidth:2, borderColor:"#ffdd79"};
const rejectedStyle = {borderWidth:2, borderColor:"#E88888"};
const recontactStyle = {borderWidth:2, borderColor:"#79c7e6"};
const inactiveStyle = {borderColor:"#DDDDDD", color:"#AAAAAA"}

export default function({ recruit, stepSelected }) {
  if(!recruit.interview){return null;}
  return (
    <div className="interviewSectionContainer">
    <h3>Interview progress</h3>
      {
        recruit.interview.steps.map((item, index) => {
          const isStepActive = recruit.interview.currentStepIndex >= index;
          const isLineStepActive = recruit.interview.currentStepIndex > index;
          const shouldRenderStepLine = recruit.interview.steps.length != index + 1;
          return (
            <div className="stepContainer" key={index}>
              <StepIndicator step={item} diameter={diameter} active={isStepActive} stepSelected={stepSelected}/>
              { shouldRenderStepLine && <StepConnector active={isLineStepActive}/> }
            </div>)
        })
      }
    </div>
  );
}

const StepIndicator = ({diameter, step, active, stepSelected, contentClassName}) => {
  var className = (contentClassName) ? contentClassName: "interViewStepIndicator";
  var style = (active) ? activeStyle : inactiveStyle;
  if(step.status === "REJECTED"){
    style = rejectedStyle;
  }
  else if(step.status === "RECONTACT"){
      style = recontactStyle;
  }else if(step.status === "ONGOING"){
    style = ongoingStyle;
  }
  var handleClick = (event) => {
    if(stepSelected){
      stepSelected(event, step)
    }
  }
  return (
    <CircularContainer className="stepIndicator" width={diameter} height={diameter} style={style} onClick={handleClick.bind(this)}>
      <div className={className}>
        {step.number}
      </div>
    </CircularContainer>
  )
}

const StepConnector = ({active}) =>{
  var style = (active) ? activeStyle : inactiveStyle;
  return (
      <div className="line" style={style}></div>
  )
}
