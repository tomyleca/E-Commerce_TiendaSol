import React from "react";
import HotelCard from "./HotelCard";
import hoteles from "../data/hoteles.json";

const ProductoItem = () => {
  return (
    <div className="shop-container">
      <div className="filters">
        <h3>Filtros</h3>
        {/* acá van tus filtros */}
      </div>
      <div className="products">
        {hoteles.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};
