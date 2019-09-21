import React, { Component } from "react";
import Spinner from "../components/Spinner";
import RestaurantInfo from "../components/RestaurantInfo";
import Button from "../components/Button";
import AdvancedSearch from "../components/AdvancedSearch/AdvancedSearch";
export default class LandingPage extends Component {
  state = {
    restaurants: [],
    searchSetting: { radius: 5, limit: 8 },
    selected: {}
  };
  /**
   * Update search setting
   * @param searchSetting, object containing radius and limit
   * @returns does not return anything
   */
  updateSearchSetting = searchSetting => {
    this.setState({ searchSetting });
  };
  /**
   * Filter through a list of restaurants based of search setting
   * @param restaurants, array of objects
   * @returns restaurants, array of objects
   */
  filter = restaurants => {
    const { radius, limit } = this.state.searchSetting;
    return restaurants
      .filter(restaurant => restaurant.radius <= radius)
      .slice(0, limit);
  };

  componentDidMount() {
    // TODO: grab top restaurant info from yelp
    // this.filter(restaurants)
    //
  }
  render() {
    const { restaurants, selected } = this.state;
    return (
      <div>
        {/* TODO: find spinner library */}
        <Spinner restaurants={restaurants} />
        {/* TODO:  search by radius and number of restaurants*/}
        <AdvancedSearch updateSearchSetting={this.updateSearchSetting} />
        {/* TODO: */}
        <Button />
        {/* TODO: */}
        <RestaurantInfo selected={selected} />
      </div>
    );
  }
}
