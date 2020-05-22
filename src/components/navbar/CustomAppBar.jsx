import React, { PureComponent } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { CustomNavbar } from "../../components";
import "./CustomAppBar.scss";

export default class CustomAppBar extends PureComponent {
  render() {
    return (
      <AppBar className='app-bar' color='transparent'>
        <Toolbar className='toolbar'>
          <CustomNavbar />
          <Typography className='text-logo' variant='h6' noWrap>
            <a href='#'>Covid Tracker</a>
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
