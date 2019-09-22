import React, { Component } from "react";
import SpinnerCard from "../components/SpinnerCard";
import RestaurantInfo from "../components/RestaurantInfo";
export default class LandingPage extends Component {
  state = {
    restaurants: [],
    searchSetting: { radius: 5, limit: 8 },
    selected: {},
    spinning: false
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
    await this.getPosition()
      .then(position => {
        localStorage.setItem("latitude", position.coords.latitude);
        localStorage.setItem("longitude", position.coords.longitude);
      })
      .catch(err => {
        console.log(err.message);
      });
    const { radius, limit } = this.state.searchSetting;
    const DINNER_SPINNER_BE_BASE_URL =
      "https://dinner-spinner.herokuapp.com/api/restaurants/";

    let longitude = localStorage.getItem("longitude");
    let latitude = localStorage.getItem("latitude");

    let DINNER_SPINNER_BE_URL = `${DINNER_SPINNER_BE_BASE_URL}${latitude}/${longitude}/${radius}/${limit}`;
    console.log(DINNER_SPINNER_BE_URL);
    fetch(DINNER_SPINNER_BE_URL)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ ...this.state, restaurants: data.businesses });
      })
      .catch(err => {
        console.log(err);
      });
  }

  /*
   * Gets the current position of the sign-in user
   **/
  getPosition = () => {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  handleClick = e => {
    e.preventDefault();
    const longitude = localStorage.getItem("longitude");
    const latitude = localStorage.getItem("latitude");
  };
  render() {
    const { restaurants, selected, spinning } = this.state;
    return (
      <div>
        <SpinnerCard
          restaurant={restaurants}
          updateSearchSetting={this.updateSearchSetting}
          handleClick={this.handleClick}
          spinning={spinning}
        />
        <RestaurantInfo selected={selected} />
      </div>
    );
  }
}
