import React, { PureComponent } from "react";
import { fetchDayOneForCountryCovidData } from "../../../api";
import {
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import LinearProgress from "@material-ui/core/LinearProgress";
import moment from "moment";

export default class TrackChartPercentage extends PureComponent {
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
    if (previousProps.countryName != this.props.countryName) {
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
    const percentageDataArray = [];
    data.forEach((dataItem) => {
      const percentageData = {
        date: dataItem.FullDate,
        total: 100,
        recovered: 100 * (dataItem.Recovered / dataItem.Confirmed),
        deaths: 100 * (dataItem.Deaths / dataItem.Confirmed),
      };
      percentageDataArray.push(percentageData);
    });
    this.setState({ covidData: percentageDataArray });
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
            <linearGradient
              id='confirmedPercentage'
              x1='0'
              y1='0'
              x2='0'
              y2='1'>
              <stop offset='5%' stopColor='#009df8' stopOpacity={1} />
              <stop offset='95%' stopColor='#93d7ff' stopOpacity={0.6} />
            </linearGradient>
            <linearGradient
              id='recoveredPercentage'
              x1='0'
              y1='0'
              x2='0'
              y2='1'>
              <stop offset='5%' stopColor='#33cc33' stopOpacity={1} />
              <stop offset='95%' stopColor='#b0ecb0' stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id='deathsPercentage' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#e31c1c' stopOpacity={1} />
              <stop offset='95%' stopColor='#f39c9c' stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid />
          <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
          <XAxis
            stroke='yellow'
            dataKey='date'
            tickFormatter={(datakKey) => moment(datakKey).format("MM/DD/YY")}
          />
          <YAxis
            stroke='yellow'
            type='number'
            tickFormatter={(tick) => `${tick.toLocaleString()}%`}
          />
          <Legend formatter={this.renderColorfulLegendText} />
          <Area
            type='stepAfter'
            dataKey='total'
            stroke='#009df8'
            fill='url(#confirmedPercentage)'
          />
          <Area
            type='monotone'
            dataKey='recovered'
            stroke='#2a9400'
            fill='url(#recoveredPercentage)'
          />
          <Area
            type='monotone'
            dataKey='deaths'
            stroke='#ff0040'
            fill='url(#deathsPercentage)'
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
