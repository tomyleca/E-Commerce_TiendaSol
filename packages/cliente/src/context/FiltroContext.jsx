import { createContext, useCallback, useContext, useMemo, useState } from "react";



const FiltroContext = createContext(undefined);

// Normaliza un valor de categoría (objeto Mongo, número o string) a string de id
const normalizeId = (val) => {
	if (val && typeof val === "object") {
		const maybe = val._id ?? val.id ?? undefined;
		return maybe !== undefined ? String(maybe) : "";
	}
	return val != null ? String(val) : "";
};

export const FiltroProvider = ({ children, initialCategorias = [] }) => {
	const [selectedCategorias, _setSelectedCategorias] = useState(
		(initialCategorias || []).map((x) => normalizeId(x))
	);

	const setSelectedCategorias = useCallback((ids) => {
		const next = (ids || []).map((x) => normalizeId(x));
		_setSelectedCategorias(next);
	}, []);

	const toggleCategoria = useCallback((id) => {
		const s = normalizeId(id);
		_setSelectedCategorias((prev) =>
			prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
		);
	}, []);

	const clearCategorias = useCallback(() => {
		_setSelectedCategorias([]);
	}, []);

	const value = useMemo(
		() => ({
			selectedCategorias,
			setSelectedCategorias,
			toggleCategoria,
			clearCategorias,
			hasCategoria: (id) => selectedCategorias.includes(normalizeId(id)),
			countCategorias: selectedCategorias.length,
		}),
		[selectedCategorias, setSelectedCategorias, toggleCategoria, clearCategorias]
	);

	return (
		<FiltroContext.Provider value={value}>{children}</FiltroContext.Provider>
	);
};

export const useFiltro = () => {
	const ctx = useContext(FiltroContext);
	if (!ctx) throw new Error("useFiltro debe usarse dentro de FiltroProvider");
	return ctx;
};


export default FiltroContext;
