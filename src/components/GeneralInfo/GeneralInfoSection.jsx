import React, { PureComponent } from "react";
import gsap from "gsap";
import { fetchSummaryCovidData } from "../../api";
import { InfoGraphs } from "../../components/";
import "./GeneralInfoSection.scss";

export default class GeneralInfoSection extends PureComponent {
  constructor(props) {
    super(props);
    this.infoGraphsContainerRef = React.createRef();
    this.infoGraphsRef = React.createRef();
    this.state = {
      summaryData: {},
      loading: false,
    };
  }

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

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.loading !== this.state.loading) {
      const covidData = await fetchSummaryCovidData();

      this.setState({
        summaryData: covidData,
      });
    }
    this.fadeIn(".info-graphs-container");
  }

  async componentDidMount() {
    window.addEventListener("scroll", (eventArgs) => {
      if (
        window.scrollY >=
        this.infoGraphsContainerRef.current.scrollHeight / 3
      ) {
        this.setState({ loading: true });
      }
    });
  }

  render() {
    const { summaryData } = this.state;

    return (
      <div>
        <div ref={this.infoGraphsContainerRef} className='mid-svg-container'>
          <svg
            className='mid-inverted-wave-svg'
            viewBox='0 0 1440 143'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M1060.97 68.4253C1218.39 164.445 1379.25 108.434 1440 68.4253L1440 143L0 143L-7.61254e-06 55.9228C95.7997 11.0802 314.937 -49.1991 425.09 68.4254C535.243 186.05 667.594 117.436 720 68.4254C768.067 28.417 903.555 -27.5946 1060.97 68.4253Z'
              fill='#DFD604'
            />
          </svg>
          <div className='mid-rect'></div>
          <svg
            className='mid-wave-svg'
            viewBox='0 0 1438 143'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M378.5 74.5746C221.3 -21.4453 60.6667 34.5663 0 74.5746V0H1438V87.0772C1342.33 131.92 1123.5 192.199 1013.5 74.5746C903.5 -43.0498 771.333 25.5645 719 74.5746C671 114.583 535.7 170.595 378.5 74.5746Z'
              fill='#DFD604'
            />
          </svg>
          {this.state.loading ? (
            <div ref={this.infoGraphsRef} className='info-graphs-container'>
              <InfoGraphs covidData={summaryData} />
            </div>
          ) : (
            <div className='info-graphs-container'></div>
          )}
        </div>
      </div>
    );
  }
}
