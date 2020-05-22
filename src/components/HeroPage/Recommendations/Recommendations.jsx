import React, { PureComponent } from "react";
import { Box } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { TipCard } from "../../../components";
import gsap from "gsap";
import {
  faHandsWash,
  faHeadSideMask,
  faRuler,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import "./Recommendations.scss";

export default class Recommendations extends PureComponent {
  constructor(props) {
    super(props);
    this.heroTitleElement = null;
    this.tipsContainer = null;
  }

  async componentDidMount() {
    gsap.fromTo(
      this.heroTitleElement,
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0, duration: 2.3, ease: "expo.out(8)" }
    );
    gsap.fromTo(
      this.tipsContainer,
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0, duration: 2.3, ease: "expo.out(8)" }
    );
  }

  render() {
    return (
      <Box className='box-container'>
        <div className='hero-title-div'>
          <p ref={(p) => (this.heroTitleElement = p)} className='hero-title'>
            COVID 19
          </p>
          <p className='hero-content'> Remember about few things: </p>
        </div>
        <Grid
          ref={(grid) => (this.tipsContainer = grid)}
          container
          className='tips-container'>
          <Grid item lg={3} md={3} sm={6} xs={6}>
            <TipCard icon={faSmile} text='Stay positive!' />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={6}>
            <TipCard icon={faHandsWash} text='Wash hands carefully' />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={6}>
            <TipCard
              icon={faHeadSideMask}
              text='Do not touch your face without need'
            />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={6}>
            <TipCard icon={faRuler} text='Remember about keeping distance' />
          </Grid>
        </Grid>
      </Box>
    );
  }
}
