import './details.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import Layout from './../../../components/Layout';
import Loader from './../../../components/Loader';
import ActionMenu from './../../../components/Action/ActionMenu';
import ActionButton from './../../../components/Action/ActionButton';
import history from './../../../core/history';
import CommentList from './../../../containers/CommentsListContainer';
import { formatLinkedInUrl, formatGithubUrl, formatFacebookUrl, formatEmailUrl } from "../../../helpers/connectionFormatHelper";

class Recruit extends Component {

  handleEditRecruitClicked(){
    history.push("/recruits/"+ this.props.recruit._id +"/edit");
  }

  render() {
    return (
      <Layout>
        <Loader isLoading={this.props.isLoading}>
        <div>
          <div>
            {this.renderName()}
            {this.renderConnections()}
            <CommentList commentKey={getCommentKey(this.props.id)}/>
            {/*
            <CommentCreate commentKey={getCommentKey(this.props.id)} loggedInUser={this.state.loggedInUser}/> */}
          </div>
        </div>
        </Loader>

        <ActionMenu>
          { this.renderActionButtonsContianer() }
        </ActionMenu>

      </Layout>
    );
  }

  renderName(){
    if(!this.props.recruit){ return null; }
    return (<h3>{ this.props.recruit.firstname } { this.props.recruit.lastname }</h3>);
  }

  renderConnections(){
    if(!this.props.recruit){ return null; }
    var connections = this.props.recruit.connections;
    var connectionList =[];
    if(connections.linkedIn){connectionList.push({icon:"linkedin-square", text:formatLinkedInUrl(connections.linkedIn), link: formatLinkedInUrl(connections.linkedIn)})};
    if(connections.facebook){connectionList.push({icon:"facebook-square", text: formatFacebookUrl(connections.facebook), link: formatFacebookUrl(connections.facebook)})};
    if(connections.github){connectionList.push({icon:"github-square", text: formatGithubUrl(connections.github), link: formatGithubUrl(connections.github)})};
    if(connections.phone){connectionList.push({icon:"phone-square", text: connections.phone, link: connections.phone})};
    if(connections.mail){connectionList.push({icon:"envelope", text: connections.mail, link: formatEmailUrl(connections.mail)})};

    return (
      <div>
        <h5>Contact</h5>
        {connectionList.map((item, index) => (
          <div key={index}>
            <div className="iconContainer"><FontAwesome name={item.icon}/></div>
            <div className="connectionContainer">
              <a className="link" href={item.link} target="BLANK">
                {item.text}
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }

  renderActionButtonsContianer() {
    if(!this.props.recruit){ return; };
    return (
      <div>
        <ActionButton text="Edit" icon="pencil" onClick={this.handleEditRecruitClicked.bind(this)}/>
      </div>
    );
  }
}

function getCommentKey(id){
  return "recruit-" + id;
}

const mapStateToProps = state => {
  return {
    recruit: state.recruit.data,
    isLoading: state.recruit.isLoading
  }
}

const ConnectedRecruit = connect(
  mapStateToProps
)(Recruit)

export default ConnectedRecruit;