import Card2 from './card-producto/card2.jsx';
import './Body2.css';
import Filtros from './Filtros.jsx';
import { useState } from 'react';
import BarraBusqueda from './BarraBusqueda.jsx';

const Body2 = ({productos,categorias}) => {

  
    

    

  return (
    <div className="productos-layout">

    <section className="filtros"> 
      <Filtros categorias={categorias} />
     </section>
      <section className="productos">
        {productos.map(p => (
          <Card2 key={p.id} producto={p} />
        ))}
      </section>
    </div>
  );
};

export default Body2;
