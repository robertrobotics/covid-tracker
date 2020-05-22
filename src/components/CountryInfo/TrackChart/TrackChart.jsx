import React, { PureComponent } from "react";
import { fetchDayOneForCountryCovidData } from "../../../api";
import {
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import moment from "moment";

export default class TrackChart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      countryNameSelected: "Poland",
      covidData: [],
    };
  }

  async componentDidMount() {
    this.RefreshCovidData(this.props.countryName);
  }

  async componentDidUpdate(previousProps, previousState) {
    if (previousProps.countryName !== this.props.countryName) {
      await this.RefreshCovidData(this.props.countryName);
    }
  }

  RefreshCovidData = async (countryName) => {
    const countryData = await fetchDayOneForCountryCovidData(countryName);
    const data = [];

    if (countryData?.data === undefined) return data;

    countryData.data.forEach((dailyData) => {
      const dailyDataObject = {
        Country: dailyData.Country,
        Confirmed: dailyData.Confirmed,
        Deaths: dailyData.Deaths,
        Recovered: dailyData.Recovered,
        Active: dailyData.Active,
        Day: new Date(dailyData.Date).getDay(),
        Month: new Date(dailyData.Date).getMonth() + 1,
        Year: new Date(dailyData.Date).getFullYear(),
        FullDate: new Date(dailyData.Date).toDateString(),
        DateFormatted: moment(this.FullDate).format("MM/DD/YY"),
      };
      data.push(dailyDataObject);
    });

    this.setCovidData(data);
  };

  setCovidData = (data) => {
    this.setState({ covidData: data });
  };

  setCountryName = (name) => {
    this.setState({ countryName: name });
  };

  renderColorfulLegendText = (value, entry) => {
    const { color } = entry;

    return <span style={{ color }}>{value}</span>;
  };

  render() {
    return (
      <ResponsiveContainer
        className='trackchart-container'
        width='99%'
        height={400}>
        <AreaChart
          data={this.state.covidData}
          margin={{ top: 40, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id='colorConfirmed' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#e3941c' stopOpacity={1} />
              <stop offset='95%' stopColor='#f3d3a3' stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id='colorRecovered' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#33cc33' stopOpacity={1} />
              <stop offset='95%' stopColor='#b0ecb0' stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id='colorDeaths' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#e31c1c' stopOpacity={1} />
              <stop offset='95%' stopColor='#f39c9c' stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <XAxis
            stroke='yellow'
            dataKey='FullDate'
            tickFormatter={(datakKey) => moment(datakKey).format("MM/DD/YY")}
          />
          <YAxis
            stroke='yellow'
            type='number'
            tickFormatter={(tick) => tick.toLocaleString()}
          />
          <Tooltip />
          <Legend formatter={this.renderColorfulLegendText} />
          <Area
            type='natural'
            dataKey='Confirmed'
            stroke='#ffc400'
            fill='url(#colorConfirmed)'
          />
          <Area
            type='natural'
            dataKey='Recovered'
            stroke='#2a9400'
            fill='url(#colorRecovered)'
          />
          <Area
            type='natural'
            dataKey='Deaths'
            stroke='#ff0040'
            fill='url(#colorDeaths)'
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
