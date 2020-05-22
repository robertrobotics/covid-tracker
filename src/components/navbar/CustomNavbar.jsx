import React, { PureComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagramSquare,
  faCodepen,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import "./CustomNavbar.scss";

export default class CustomNavbar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      overlayMenuOpened: false,
    };
  }

  componentDidUpdate() {}

  NavButtonClicked = () => {
    this.setState({ overlayMenuOpened: !this.state.overlayMenuOpened });
  };

  render() {
    const overlayOpen = this.state.overlayMenuOpened;

    return (
      <Container>
        <div
          onClick={this.NavButtonClicked}
          className={
            !overlayOpen
              ? "nav-btn-container"
              : "nav-btn-container nav-btn-clicked"
          }>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Grid
          container
          spacing={1}
          className={!overlayOpen ? "overlay" : "overlay show"}>
          <Grid item sm={6} xs={12} className='overlay-about-container'>
            <div className='title'>About</div>
            <div className='about-site-overlay'>
              Data is being taken from{" "}
              <a href='https://github.com/CSSEGISandData/COVID-19'>
                Johns Hopkins CSSE
              </a>{" "}
              (Johns Hopkins University Center) via{" "}
              <a href='https://covid19api.com/'>Covid19API</a> site. Please, do
              not treat site's data as a official reference point - data
              presented on this site can be inaccurate. Site has been created as
              a hobby project, feel free to check source code.
              <div>Copyright &copy; 2020</div>
            </div>
          </Grid>
          <Grid item sm={6} xs={12} className='overlay-contact-container'>
            <div className='title'>Source code</div>
            <div className='contact-links'>
              <a href='https://github.com/robertrobotics/covid-tracker'>
                <FontAwesomeIcon icon={faGithub}> </FontAwesomeIcon>
              </a>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
