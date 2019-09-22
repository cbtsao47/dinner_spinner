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
  handleChange = e => {
    this.setState({
      searchSetting: {
        ...this.state.searchSetting,
        [e.target.name]: Number(e.target.value)
      }
    });
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
    fetch(DINNER_SPINNER_BE_URL)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(JSON.stringify(data.businesses[0]));
        this.setState({
          ...this.state,
          restaurants: data.businesses,
          selected: data.businesses[0]
        });
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
  handleClick = bool => {
    const { radius, limit } = this.state.searchSetting;
    const DINNER_SPINNER_BE_BASE_URL =
      "https://dinner-spinner.herokuapp.com/api/restaurants/";

    let longitude = localStorage.getItem("longitude");
    let latitude = localStorage.getItem("latitude");
    bool
      ? fetch(
          `${DINNER_SPINNER_BE_BASE_URL}${latitude}/${longitude}/${radius}/${limit}`
        )
          .then(res => res.json())
          .then(data => {
            this.setState({ spinning: bool, restaurants: data.businesses });
          })
          .catch(err => console.log(err))
      : this.setState({ spinning: bool });
  };
  updateSelected = selected => {
    const result = this.state.restaurants.filter(
      restaurant => restaurant.name === selected.textContent
    )[0];
    this.setState({ selected: result });
  };
  render() {
    const { restaurants, selected, spinning, searchSetting } = this.state;
    return (
      <main className="landing-page-container">
        <SpinnerCard
          restaurants={restaurants}
          handleClick={this.handleClick}
          spinning={spinning}
          handleChange={this.handleChange}
          searchSetting={searchSetting}
          updateSelected={this.updateSelected}
        />
        <RestaurantInfo selected={selected} />
      </main>
    );
  }
}
