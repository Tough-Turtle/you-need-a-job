import React, { Component } from "react";
import _ from 'lodash';
import { useLinkedIn } from "react-linkedin-login-oauth2";
import linkedin from "react-linkedin-login-oauth2";
// require('dotenv').config()

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
      firstName: null,
      lastName: null,
      profileURL: null,
      pictureURL: null,
    //   email: null,
    };
  }
  componentDidMount() {
    window.addEventListener("message", this.handlePostMessage);
  }

  handlePostMessage = (event) => {
    if (event.data.type === "profile") {
      this.updateProfile(event.data.profile);
      console.log(
        `Login successful: ${event.data.profile.localizedFirstName}`,
        { position: "top" }
      );
    }
  };

  updateProfile = (profile) => {
    console.log(profile)
      this.setState({
        isAuthorized: true,
        firstName: _.get(profile,'localizedFirstName',''),
        lastName: _.get(profile,'localizedLastName',''),
        profileURL: `https://www.linkedin.com/in/${_.get(profile,'vanityName','')}`,
        pictureURL: _.get(_.last(_.get(profile,'profilePicture.displayImage~.elements','')),'identifiers[0].identifier','')
      })
  }

  requestProfile = () => {
    const oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&scope=r_liteprofile&state=123456&redirect_uri=http://localhost:3001/callback`;
    const width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;

    window.location.replace(
      oauthUrl,
      "Linkedin",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };
  render() {
    return (
      <div className="App-body">
        <button onClick={this.requestProfile}>Linkedin Login</button>
        {this.state.isAuthorized && (
          <div>
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            profileURL={this.state.profileURL}
            pictureURL={this.state.pictureURL}
            {/* email={this.state.email} */}
          </div>
        )}
      </div>
    );
  }
}

export default Login;
