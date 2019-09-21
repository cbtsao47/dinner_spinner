import React from "react";

const RestaurantInfo = ({ selected }) => {
  return (
    <div>
      <img src={selected.image_url} alt={selected.name} />
      <p>{selected.is_closed}</p>
      <p>{selected.rating}</p>
      <address>
        <p>{selected.location && selected.location.display_address}</p>
      </address>
      <a href={`tel:${selected.phone}`}>{selected.display_phone}</a>
    </div>
  );
};

export default RestaurantInfo;
