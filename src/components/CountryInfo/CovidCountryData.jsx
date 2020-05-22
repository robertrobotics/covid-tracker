import React, { PureComponent } from "react";
import {
  CountrySelector,
  TrackChart,
  TrackChartPercentage,
} from "../../components/";
import gsap from "gsap";
import "./CovidCountryData.scss";

export default class CovidCountryData extends PureComponent {
  constructor(props) {
    super(props);
    this.mainCountryDataContainer = React.createRef();
    this.state = {
      loading: false,
      countryName: "Poland",
      isCountrySelected: false,
    };
  }

  async componentDidMount() {
    window.addEventListener("scroll", (eventArgs) => {
      if (
        window.scrollY >=
        this.mainCountryDataContainer.current.scrollHeight * 1.5
      ) {
        this.setState({ loading: true });
      }
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.loading !== this.state.loading) {
      this.fadeIn(".main-country-data-container");
    }
  }

  setCountryName = (name) => {
    this.setState({ countryName: name });
  };

  onCountrySelected = (eventArgs) => {
    if (eventArgs.closed) {
      this.setCountryName(eventArgs.countryName);
    }
  };

  fadeIn = (element) => {
    gsap.fromTo(
      element,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 2.3, ease: "expo.out(8)" }
    );
  };

  fadeOut = (element) => {
    gsap.to(element, 1, {
      opacity: 0,
      y: -60,
      ease: "power4.out",
    });
  };

  render() {
    return (
      <div
        ref={this.mainCountryDataContainer}
        className='main-country-data-container'>
        {this.state.loading ? (
          <div className='country-data-container'>
            <p className='country-data-section-title'>Country Data</p>
            <div className='country-selector'>
              <CountrySelector
                onCountryChange={(eventArgs) => {
                  this.onCountrySelected(eventArgs);
                }}
              />
            </div>
            <div className='track-chart'>
              <TrackChart
                className='track-chart'
                countryName={this.state.countryName}
              />
            </div>
            <div className='track-chart-perc'>
              <TrackChartPercentage
                className='track-chart-perc'
                countryName={this.state.countryName}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
