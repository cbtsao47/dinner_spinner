import React, { Component } from "react";
import Spinner from "../components/Spinner";
import RestaurantInfo from "../components/RestaurantInfo";
import Button from "../components/Button";
export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <Spinner />
        <Button />
        <RestaurantInfo />
      </div>
    );
  }
}
