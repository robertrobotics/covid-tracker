import React, { PureComponent } from "react";
import "./InfoGraphs.scss";
import { Container, Grid, LinearProgress } from "@material-ui/core";
import { CustomCard } from "../..";
import CountUp from "react-countup";

export default class InfoGraphs extends PureComponent {
  render() {
    const { covidData } = this.props;
    if (!covidData.TotalConfirmed) {
      return (
        <div className='loading-data-info'>
          <p>Waiting for data...</p>
          <LinearProgress />
        </div>
      );
    }
    return (
      <Container className='cards-container'>
        <p className='section-title'>Global data</p>
        <Grid container>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <CustomCard
              title='Total infenctions'
              content={
                <CountUp
                  start={0}
                  duration={5}
                  separator=' '
                  end={covidData.TotalConfirmed}
                />
              }
              footer={new Date(
                covidData.CountriesData[0].Date
              ).toLocaleDateString()}
            />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <CustomCard
              title='Total recoveries'
              content={
                <>
                  <CountUp
                    start={0}
                    duration={5}
                    separator=' '
                    end={covidData.TotalRecovered}
                  />
                </>
              }
              footer={new Date(
                covidData.CountriesData[0].Date
              ).toLocaleDateString()}
            />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <CustomCard
              title='Total Deaths'
              content={
                <CountUp
                  start={0}
                  duration={5}
                  separator=' '
                  end={covidData.TotalDeaths}
                />
              }
              footer={new Date(
                covidData.CountriesData[0].Date
              ).toLocaleDateString()}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}
