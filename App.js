import React, { Component } from "react";
import { data } from "./data";
import "./App.css";

const mapMemu = (arr, check) => {
  if (!arr.length) {
    return;
  }
  return (
    <ul>
      {arr.map(item => {
        if (item.childdimensions.length > 0) {
          return (
            <li key={item.dimensionvalue}>
              <h5 onClick={() => check(item.dimensionvalue)}>
                {item.dimensionname}*
              </h5>
              {item.checked ? mapMemu(item.childdimensions, check) : null}
            </li>
          );
        } else {
          return (
            <li key={item.dimensionvalue}>
              <h5>{item.dimensionname}</h5>
            </li>
          );
        }
      })}
    </ul>
  );
};

const mapData = (arr, value) => {
  if (!arr.length) {
    return;
  }
  return arr.map(item => {
    if (item.dimensionvalue === value) {
      item.checked = !item.checked;
    } else if(item.childdimensions.length > 0) {
      item.childdimensions = mapData(item.childdimensions, value);
    }
    return item;
  });
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      data
    };
  }
  render() {
    return <div>{mapMemu(this.state.data, this.handleIsShow)}</div>;
  }
  handleIsShow = value => {
    this.setState({
      data: mapData(this.state.data, value)
    });
  };
}

export default App;
