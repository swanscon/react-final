import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditVehicleForm from "./EditVehicleForm";
import DeleteVehicle from "./DeleteVehicle";
import FavoritesContext from "../store/favorites-context";
import VehicleModal from "./VehicleModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPenToSquare,
	faStarHalf,
	faStarHalfAlt,
	faStarHalfStroke,
	faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { Button } from "react-bootstrap";
import classes from "./VehicleList.module.css";
import { faStar, faStarAndCrescent } from "@fortawesome/free-solid-svg-icons";

function VehicleList(props) {
	const [showEdit, setShowEdit] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [showView, setShowView] = useState(false);
	const [currentVehicle, setCurrentVehicle] = useState(null);
	const [loadedVehicles, setLoadedVehicles] = useState(props.vehicles);

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

	useEffect(() => {
		setLoadedVehicles(props.vehicles);
	}, [props.vehicles]);

	const navigate = useNavigate();

	function handleUpdate(updatedVehicleData) {
		fetch(`http://localhost:8080/vehicles/`, {
			method: "PUT",
			body: JSON.stringify(updatedVehicleData),
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => {
				if (!response.ok) {
					return response.text().then((text) => {
						throw new Error(text || "Server error");
					});
				}
				return response.json();
			})
			.then((updatedVehicle) => {
				setLoadedVehicles((prevVehicles) =>
					prevVehicles.map((vehicle) =>
						vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
					)
				);
				console.log(`Vehicle updated: ${updatedVehicle}`);
				navigate("/vehicles");
			})
			.catch((error) => {
				console.error("Error updating vehicle: ", error);
			});
	}

	function handleDelete(vehicleId) {
		fetch(`http://localhost:8080/vehicles/${vehicleId}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		}).then((response) => {
			if (response.ok) {
				setLoadedVehicles((prevVehicles) =>
					prevVehicles.filter((vehicle) => vehicle.id !== vehicleId)
				);
				console.log("Vehicle deleted: " + vehicleId);
				navigate("/vehicles");
			} else {
				console.log("Couldn't delete vehicle: " + vehicleId);
			}
		});
	}

	const favoriteCtx = useContext(FavoritesContext);
	const itemIsFavorite = (vehicleId) => favoriteCtx.itemisFavorite(vehicleId);

	function toggleFavoriteStatusHandler(vehicle) {
		setCurrentVehicle(vehicle);
		if (itemIsFavorite(vehicle.id)) {
			console.log(
				`${vehicle.vehicleModel.vehicleMake.vehicleMakeName} ${vehicle.vehicleModel.vehicleModelName} ` +
					`with VIN: ${vehicle.vehicleVIN} removed from favorites.`
			);
			favoriteCtx.removeFavorite(vehicle.id);
		} else {
			console.log(
				`${vehicle.vehicleModel.vehicleMake.vehicleMakeName} ${vehicle.vehicleModel.vehicleModelName} ` +
					`with VIN: ${vehicle.vehicleVIN} added to favorites.`
			);
			favoriteCtx.addFavorite({
				id: vehicle.id,
				image: vehicle.vehicleModel.vehicleModelImage,
				make: vehicle.vehicleModel.vehicleMake.vehicleMakeName,
				model: vehicle.vehicleModel.vehicleModelName,
				vin: vehicle.vehicleVIN,
				licensePlate: vehicle.vehicleLicense,
				year: vehicle.vehicleYear,
				color: vehicle.vehicleColor,
			});
		}
	}

	return (
		<>
			<tbody>
				{loadedVehicles.map((vehicle) => {
					return (
						<tr key={vehicle.id}>
							<td>
								<Button
									onClick={() => toggleFavoriteStatusHandler(vehicle)}
									className="btn btn-warning"
								>
									{itemIsFavorite(vehicle.id) ? (
										<FontAwesomeIcon icon={faStar} />
									) : (
										<FontAwesomeIcon icon={faStarHalfStroke} />
									)}
								</Button>
							</td>
							<td>{vehicle.vehicleModel?.vehicleMake?.vehicleMakeName || "N/A"}</td>
							<td>{vehicle.vehicleModel?.vehicleModelName || "N/A"}</td>

							<th className="select" onClick={() => viewVehicleHandler(vehicle)}>
								{vehicle.vehicleVIN}
							</th>

							<td>{vehicle.vehicleLicense}</td>
							<td>{vehicle.vehicleYear}</td>
							<td>{vehicle.vehicleColor}</td>
							<td>
								<Button
									onClick={() => editVehicleHandler(vehicle)}
									className="btn btn-success"
								>
									<FontAwesomeIcon icon={faPenToSquare} />
								</Button>
							</td>
							<td>
								<Button
									onClick={() => deleteModalHandler(vehicle)}
									className="btn btn-danger"
								>
									<FontAwesomeIcon icon={faTrashCan} />
								</Button>
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
				onUpdateVehicle={handleUpdate}
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
