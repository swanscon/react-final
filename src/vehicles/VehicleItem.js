import { useContext } from "react";
import Card from "../ui/Card";
import FavoritesContext from "../store/favorites-context";

function VehicleItem(props) {
	const favoriteCtx = useContext(FavoritesContext);

	const itemIsFavorite = favoriteCtx.itemisFavorite(props.id);

	function toggleFavoriteStatusHandler() {
		if (itemIsFavorite) {
			favoriteCtx.removeFavorite(props.id);
		} else {
			favoriteCtx.addFavorite({
				id: props.id,
				image: props.image,
				make: props.make,
				model: props.model,
				vin: props.vin,
				licensePlate: props.licensePlate,
				year: props.year,
				color: props.color,
			});
		}
	}

	return (
		<Card>
			<div>
				<li>
					<div>
						<img src={props.image} alt={props.model}></img>
					</div>
					<div>
						<h3>{props.make}</h3>
						<h3>{props.model}</h3>
						<ul>
							<li>VIN: {props.vin}</li>
							<li>License Plate: {props.licensePlate}</li>
							<li>Year: {props.year}</li>
							<li>Color: {props.color}</li>
						</ul>
					</div>
					<div>
						<button onClick={toggleFavoriteStatusHandler}>
							{itemIsFavorite ? "Remove from Favorites" : "To Favorites"}
						</button>
						<button>Edit</button>
						<button>Delete</button>
					</div>
				</li>
			</div>
		</Card>
	);
}

export default VehicleItem;
