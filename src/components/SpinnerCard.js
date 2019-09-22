import React from "react";
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";
import Roulette from "./Roulette/Roulette";
import "./SpinnerCard.scss";
function SpinnerCard({
  restaurants,
  searchSetting,
  handleClick,
  spinning,
  handleChange
}) {
  return (
    <div className="card-container">
      <h2 className="spinner-title">Dinner Spinner</h2>
      <AdvancedSearch
        handleChange={handleChange}
        searchSetting={searchSetting}
      />
      <Roulette
        spinning={spinning}
        restaurants={restaurants}
        handleClick={handleClick}
      />
    </div>
  );
}

export default SpinnerCard;
