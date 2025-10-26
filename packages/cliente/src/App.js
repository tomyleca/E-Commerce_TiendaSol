import './App.css';
import ListadoProductos from './features/ListadoProductos.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/productos" element={<ListadoProductos />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
