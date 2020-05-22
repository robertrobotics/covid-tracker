import axios from "axios";
import React, { PureComponent } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./CountrySelector.scss";

export default class CountrySelector extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selectedCountryName: "Poland",
      options: [],
      loading: false,
    };
  }

  componentDidUpdate(previousProps, previousState) {
    let active = true;

    this.setLoading(this.state.open && this.state.options.length === 0);

    if (!this.state.loading) {
      return undefined;
    }

    (async () => {
      const response = await axios.get(
        "https://country.register.gov.uk/records.json?page-size=5000"
      );
      const countries = await response.data;

      if (active) {
        this.setOptions(
          Object.keys(countries).map((key) => countries[key].item[0])
        );
      }
    })();

    if (!this.state.open) {
      this.setState({ options: [] });
    }

    return () => {
      active = false;
    };
  }

  handleCountryChange = (eventArgs) => {
    this.props.onCountryChange({
      countryName: eventArgs.target.innerHTML,
      closed: this.state.open,
    });
  };

  setLoading = (loading) => {
    this.setState({ loading: loading });
  };

  setOptions = (options) => {
    this.setState({ options: options });
  };

  setOpen = (open) => {
    this.setState({ open: open });
  };

  render() {
    return (
      <div className='selector-div'>
        <Autocomplete
          className='autocomplete-form'
          id='country-selector'
          open={this.state.open}
          onOpen={() => {
            this.setOpen(true);
          }}
          onClose={(eventArgs) => {
            this.setOpen(false);
            this.handleCountryChange(eventArgs);
          }}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          options={this.state.options}
          loading={this.state.loading}
          renderInput={(params) => (
            <TextField
              className='textfield-form'
              {...params}
              label='Select country'
              variant='outlined'
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {this.state.loading ? (
                      <CircularProgress color='inherit' size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </div>
    );
  }
}
