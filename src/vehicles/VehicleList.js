import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import EditVehicleForm from "./EditVehicleForm";
import DeleteVehicle from "./DeleteVehicle";
import FavoritesContext from "../store/favorites-context";
import VehicleModal from "./VehicleModal";

function VehicleList(props) {
	const [showEdit, setShowEdit] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [showView, setShowView] = useState(false);
	const [currentVehicle, setCurrentVehicle] = useState(null);
	const [loadedVehicles, setLoadedVehicles] = useState([]);

	const handleClose = () => {
		setShowEdit(false);
		setShowDelete(false);
		setShowView(false);
	};

	function viewVehicleHandler(vehicle) {
		setCurrentVehicle(vehicle);
		setShowView(true);
	}

	function editVehicleHandler(vehicle) {
		setCurrentVehicle(vehicle);
		setShowEdit(true);
	}

	function deleteModalHandler(vehicle) {
		setCurrentVehicle(vehicle);
		setShowDelete(true);
	}

	const navigate = useNavigate();

	function handleDelete(vehicleId) {
		fetch(`https://react-final-2584b-default-rtdb.firebaseio.com/vehicles/${vehicleId}.json`, {
			method: 'DELETE'
		})
		.then(response => {
			if(response.ok) {
				setLoadedVehicles(prevVehicles=>prevVehicles.filter(
					vehicle => vehicle.id !== vehicleId
				));
				console.log("Vehicle deleted: " + vehicleId);
			} else {
				console.log("Couldn't delete vehicle: " + vehicleId);
			}
		})
	}

	const favoriteCtx = useContext(FavoritesContext);
	const itemIsFavorite = (vehicleId) => favoriteCtx.itemisFavorite(vehicleId);

	function toggleFavoriteStatusHandler(vehicle) {
		setCurrentVehicle(vehicle);
		if (itemIsFavorite(vehicle.id)) {
			console.log(
				`${vehicle.make} ${vehicle.model} with VIN: ${vehicle.vin} removed from favorites`
			);
			favoriteCtx.removeFavorite(vehicle.id);
		} else {
			console.log(
				`${vehicle.make} ${vehicle.model} with VIN: ${vehicle.vin} added to favorites`
			);
			favoriteCtx.addFavorite({
				id: vehicle.id,
				image: vehicle.image,
				make: vehicle.make,
				model: vehicle.model,
				vin: vehicle.vin,
				licensePlate: vehicle.licensePlate,
				year: vehicle.year,
				color: vehicle.color,
			});
		}
	}

	return (
		<>
			<tbody>
				{props.vehicles.map((vehicle) => {
					return (
						<tr key={vehicle.id}>
							<td>
								<button onClick={() => toggleFavoriteStatusHandler(vehicle)}>
									{itemIsFavorite(vehicle.id) ? "!" : "?"}
								</button>
							</td>
							<td>{vehicle.make}</td>
							<td>{vehicle.model}</td>
							<td>
								<button
									className="select"
									onClick={() => viewVehicleHandler(vehicle)}>
									{vehicle.vin}
								</button>
							</td>
							<td>{vehicle.licensePlate}</td>
							<td>{vehicle.year}</td>
							<td>{vehicle.color}</td>
							<td>
								<button onClick={() => editVehicleHandler(vehicle)}>E</button>
							</td>
							<td>
								<button onClick={() => deleteModalHandler(vehicle)}>D</button>
							</td>
						</tr>
					);
				})}
			</tbody>
			<VehicleModal vehicle={currentVehicle} showView={showView} handleClose={handleClose} />
			<EditVehicleForm
				vehicle={currentVehicle}
				showEdit={showEdit}
				handleClose={handleClose}
			/>
			<DeleteVehicle
				vehicle={currentVehicle}
				showDelete={showDelete}
				handleClose={handleClose}
				onDelete={handleDelete}
			/>
		</>
	);
}

export default VehicleList;
