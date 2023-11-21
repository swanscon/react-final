import VehicleNavigation from "../layout/VehicleNavigation";
import VehicleItem from "../vehicles/VehicleItem";
import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";
import classes from './FavoritesPage.module.css';

function FavoritesPage(props) {
	const favoriteCtx = useContext(FavoritesContext);

	let content;

	if (favoriteCtx.totalFavorites === 0) {
		content = <p>You have no favorites. Start adding some?</p>;
	} else {
		content = (
			<div className={classes.cardContainer}>
				{favoriteCtx.favorites.map((vehicle) => (
					<VehicleItem
						key={vehicle.id}
						id={vehicle.id}
						image={vehicle.image}
						make={vehicle.make}
						model={vehicle.model}
						vin={vehicle.vin}
						licensePlate={vehicle.licensePlate}
						year={vehicle.year}
						color={vehicle.color}
					/>
				))}
			</div>
		);
	}

	return (
		<div>
			<VehicleNavigation />
			<div className="container-fluid">
				<h1 className="page-title centered">My Favorites</h1>
				{content}
			</div>
		</div>
	);
}

export default FavoritesPage;
