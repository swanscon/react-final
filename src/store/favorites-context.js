import { createContext, useState } from "react";

const FavoritesContext = createContext({
	favorites: [],
	totalFavorites: 0,
	addFavorite: (favoriteVehicle) => {},
	removeFavorite: (vehicleId) => {},
	itemisFavorite: (vehicleId) => {},
});

export function FavoritesContextProvider(props) {
	const [userFavorites, setUserFavorites] = useState([]);

	const context = {
		favorites: userFavorites,
		totalFavorites: userFavorites.length,
		addFavorite: addFavoriteHandler,
		removeFavorite: removeFavoriteHandler,
		itemisFavorite: itemIsFavoritehandler,
	};

	function addFavoriteHandler(favoriteVehicle) {
		setUserFavorites((prevUserFavorites) => {
			return prevUserFavorites.concat(favoriteVehicle);
		});
	}

	function removeFavoriteHandler(vehicleId) {
		setUserFavorites((prevUserFavorites) => {
			return prevUserFavorites.filter((vehicle) => vehicle.id !== vehicleId);
		});
	}

	function itemIsFavoritehandler(vehicleId) {
		return userFavorites.some((vehicle) => vehicle.id === vehicleId);
	}

	return (
		<FavoritesContext.Provider value={context}>
			{props.children}
		</FavoritesContext.Provider>
	);
}

export default FavoritesContext;
