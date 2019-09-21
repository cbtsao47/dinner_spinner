import React from "react";
import Spinner from "./Spinner";
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";
import Button from "./Button";
function SpinnerCard({ restaurants, updateSearchSetting, handleClick }) {
  return (
    <div>
      <h2 className="spinner__title">Dinner Spinner</h2>
      <AdvancedSearch updateSearchSetting={updateSearchSetting} />
      <Spinner restaurants={restaurants} />
      <Button spin handleClick={handleClick} />
    </div>
  );
}

export default SpinnerCard;
