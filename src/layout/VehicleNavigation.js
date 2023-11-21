import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import NewVehicleForm from "../vehicles/NewVehicleForm";
import FavoritesContext from "../store/favorites-context";
import { Nav, Navbar, Button } from "react-bootstrap";

function VehicleNavigation({ onVehicleAdded }) {
	const favoriteCtx = useContext(FavoritesContext);

	const [showModal, setShowModal] = useState(false);

	const handleShow = () => {
		setShowModal(true);
	};

	const handleClose = () => {
		setShowModal(false);
	};

	const navigate = useNavigate();

	function addVehicleHandler(vehicleData) {
		fetch("http://localhost:8080/vehicles/", {
			method: "POST",
			body: JSON.stringify(vehicleData),
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
			.then((data) => {
				console.log(`New vehicle added: ${data}`);
				navigate("/vehicles");
				onVehicleAdded();
			})
			.catch((error) => {
				console.error("Error adding vehicle:", error);
			});
	}

	return (
		<header>
			<Navbar className="navbar bg-light border-bottom border-body">
				<div className="container-fluid">
					<Nav className="me-auto">
						<Button className="btn btn-success" onClick={handleShow}>
							Add New Vehicle
						</Button>
						<Link to="/vehicles" className="nav-link">
							All Vehicles
						</Link>
						<Link to="/favorites" className="nav-link">
							My Favorites: {favoriteCtx.totalFavorites}
						</Link>
					</Nav>
				</div>
			</Navbar>
			<NewVehicleForm
				showModal={showModal}
				handleClose={handleClose}
				onAddVehicle={addVehicleHandler}
			/>
		</header>
	);
}

export default VehicleNavigation;
