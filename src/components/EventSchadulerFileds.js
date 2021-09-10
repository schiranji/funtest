import React, { Component } from 'react';

export default class EventSchadulerFileds extends Component {
  myRef = React.createRef();

  componentDidMount() {
    this.props.registerRowDragger(this.myRef.current, 0);
  }

  render() {
    return (
      <div className="my-custom-cell-renderer">
        <div class="athlete-info">
          <span>{this.props.data.athlete}</span>
          <span>{this.props.data.country}</span>
        </div>
        <span>{this.props.data.year}</span>
        <i className="fas fa-arrows-alt-v" ref={this.myRef}></i>
      </div>
    );
  }
}