import React from "react";
import { Container } from "@material-ui/core";
import "./App.scss";
import {
  HeroSection,
  GeneralInfoSection,
  CovidCountryData,
} from "./components";

class App extends React.Component {
  render() {
    return (
      <Container className='main-container'>
        <HeroSection />
        <GeneralInfoSection />
        <CovidCountryData />
      </Container>
    );
  }
}

export default App;
