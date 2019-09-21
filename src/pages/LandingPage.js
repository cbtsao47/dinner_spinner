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
  filter = (restaurants, searchSetting) => {
    const { radius, limit } = searchSetting;
    return restaurants
      .filter(restaurant => restaurant.radius <= radius)
      .slice(0, limit);
  };

  async componentDidMount() {
    /*GET USER LOCATION*/
    // getting location details
    let latitude;
    let longitude;
    await this.getPosition()
      .then(position => {
        console.log(position.coords.latitude, position.coords.longitude);
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      })
      .catch(err => {
        console.log(err.message);
      });
    console.log(
      `LANDING PAGE :: CDM :: LOCATION IS  IS :: ${latitude}, ${longitude}`
    );

    const { radius, limit } = this.state.searchSetting;
    // TODO: grab top restaurant info from yelp
    const DINNER_SPINNER_BE_BASE_URL =
      "https://dinner-spinner.herokuapp.com/api/restaurants/";

    let DINNER_SPINNER_BE_URL = `${DINNER_SPINNER_BE_BASE_URL}${latitude}/${longitude}/${radius}/${limit}`;

    fetch(DINNER_SPINNER_BE_URL)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(JSON.stringify(data.businesses[0]));
        this.setState({
          ...this.state,
          restaurants: data.businesses,
          selected: JSON.stringify(data.businesses[0])
        });
      })
      .catch(err => {
        console.log(err);
      });
    // const {restaurants,searchSetting}=this.state
    // this.filter(restaurants,searchSetting)
    //
    console.log(this.state.restaurants);
  }

  /*
   * Gets the current position of the sign-in user
   **/
  getPosition = () => {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

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
