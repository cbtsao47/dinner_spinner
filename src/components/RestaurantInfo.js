import React from "react";
import "../styles/RestaurantInfo.css";

const RestaurantInfo = ({ selected }) => {
  console.log(selected);
  return (
    <div className="restaurant-container">
      <div className="restaurant-info-container">
        <div className="restaurant-img-parent">
          <img
            className="restaurant-image"
            src={selected.image_url}
            alt={selected.name}
          />
        </div>
        <div className="restaurant-content">
          <div className="restaurant-title">
            <h2>My pizza</h2>
            <div>
              {selected.is_closed && <p>closed now</p>}
              {!selected.is_closed && <p>open now</p>}
            </div>
          </div>
          <div className="restaurant-address">
            <p>{selected.location && selected.location.display_address}</p>
          </div>

          <div className="restaurant-phone">
            <p>{selected.phone}</p>
          </div>

          <div className="restaurant-distance">
            <p>{Math.ceil(selected.distance / 1610)} mile(s) away</p>
          </div>
        </div>
        <div className="restaurant-reserve">
          <p>Reserve</p>
        </div>
        {/* 
      <p>{selected.rating}</p>

      <a href={`tel:${selected.phone}`}>{selected.display_phone}</a> */}
      </div>
    </div>
  );
};

export default RestaurantInfo;
