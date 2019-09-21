import React, { Component } from "react";
import Spinner from "../components/Spinner";
import RestaurantInfo from "../components/RestaurantInfo";
import Button from "../components/Button";
import AdvancedSearch from "../components/AdvancedSearch/AdvancedSearch";
export default class LandingPage extends Component {
  state = {
    restaurants: []
  };
  componentDidMount() {
    // TODO: grab restaurant info from yelp
    // top 10
  }

  render() {
    const { restaurants } = this.state;
    return (
      <div>
        {/* TODO: find spinner library */}
        <Spinner restaurants={restaurants} />
        {/* TODO:  search by radius */}
        <AdvancedSearch />
        {/* TODO: */}
        <Button />
        <RestaurantInfo />
      </div>
    );
  }
}
