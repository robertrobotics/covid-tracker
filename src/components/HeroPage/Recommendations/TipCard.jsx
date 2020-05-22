import React, { PureComponent } from "react";
import "./TipCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";

export default class TipCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  GetCardIcon = () => {
    return this.props.icon;
  };

  GetCardTitle = () => {
    return this.props.text;
  };

  render() {
    return (
      <Container className='tip-card-div'>
        <Grid className='tip-icon' item>
          <FontAwesomeIcon icon={this.GetCardIcon()}> </FontAwesomeIcon>
        </Grid>
        <Grid className='tip-text' item>
          {this.GetCardTitle()}
        </Grid>
      </Container>
    );
  }
}
