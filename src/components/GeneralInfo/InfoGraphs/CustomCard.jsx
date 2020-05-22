import React, { PureComponent } from "react";
import "./CustomCard.scss";

export default class CustomCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      color: "default",
    };
  }

  render() {
    const title = this.props.title;
    const content = this.props.content;
    const footer = this.props.footer;

    return (
      <div className='card-container'>
        <div className='card-title'> {title} </div>
        <div className='card-content'> {content} </div>
        <div className='card-footer'> {footer} </div>
      </div>
    );
  }
}
