import React from "react";
import Spinner from "./Spinner";
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";
import Roulette from "./Roulette/Roulette";
function SpinnerCard({
  restaurants,
  searchSetting,
  handleClick,
  spinning,
  handleChange
}) {
  return (
    <div>
      <h2 className="spinner__title">Dinner Spinner</h2>
      <AdvancedSearch
        handleChange={handleChange}
        searchSetting={searchSetting}
      />
      <Spinner restaurants={restaurants} />
      <Roulette
        spinning={spinning}
        restaurants={restaurants}
        handleClick={handleClick}
      />
    </div>
  );
}

export default SpinnerCard;
