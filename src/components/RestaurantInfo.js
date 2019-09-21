import React from "react";
import "../styles/RestaurantInfo.css";

const RestaurantInfo = ({ selected }) => {
  // const selectedItem = JSON.parse(selected);
  console.dir(selected.image_url);
  return (
    <div className="restaurant-info-container">
      <div className="restaurant-img-parent">
        <img
          className="restaurant-image"
          src={selected.image_url}
          alt={selected.name}
        />
      </div>
      {/* <p>{selected.is_closed}</p>
      <p>{selected.rating}</p>
      <address>
        <p>{selected.location && selected.location.display_address}</p>
      </address>
      <a href={`tel:${selected.phone}`}>{selected.display_phone}</a> */}
    </div>
  );
};

export default RestaurantInfo;
