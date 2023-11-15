import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import NewVehicleForm from "../vehicles/NewVehicleForm";
import FavoritesContext from "../store/favorites-context";

function VehicleNavigation() {
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
		fetch("https://react-final-2584b-default-rtdb.firebaseio.com/vehicles.json",
		{
			method: "POST",
			body: JSON.stringify(vehicleData),
			headers: {"Content-Type": "application/json"}
		})
		.then(response => response.json())
		.then(data =>{console.log(`New vehicle added: ${data}`);
		})
	}

	return (
		<header>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link to="/vehicles" className="nav-link">
								All Vehicles
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/favorites" className="nav-link">
								My Favorites: {favoriteCtx.totalFavorites}
							</Link>
						</li>
						<li className="nav-item">
							<span className="nav-link select" onClick={handleShow}>
								Add New Vehicle
							</span>
						</li>
					</ul>
				</div>
			</nav>
			<NewVehicleForm showModal={showModal} handleClose={handleClose} onAddVehicle={addVehicleHandler}/>
		</header>
	);
}

export default VehicleNavigation;
