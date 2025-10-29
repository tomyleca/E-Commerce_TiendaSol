import Card2 from './card-producto/card2.jsx';
import './Body2.css';
import Filtros from './Filtros.jsx';
import { useState } from 'react';
import BarraBusqueda from './BarraBusqueda.jsx';

const Body2 = ({productos}) => {

    const [busqueda, setBusqueda] = useState("");
    // Derivar categorías únicas desde los productos
    const categorias = (() => {
      const map = new Map();
      for (const p of productos || []) {
        const arr = Array.isArray(p.categorias) ? p.categorias : [];
        for (const cat of arr) {
          const id = cat?._id ?? cat?.id ?? String(cat);
          const nombre = cat?.nombre ?? String(cat);
          if (!map.has(id)) map.set(id, { id, nombre });
        }
      }
      return Array.from(map.values());
    })();
    

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
