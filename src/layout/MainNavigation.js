import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

function MainNavigation() {
	return (
		<header>
			<Navbar className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
				<div className="container-fluid">
					<Link to="/" className="navbar-brand">
						Car Catalog
					</Link>
					<Nav className="me-auto">
						<Link to="/" className="nav-link">
							Home
						</Link>
						<Link to="/vehicles" className="nav-link">
							Vehicles
						</Link>
					</Nav>
				</div>
			</Navbar>
		</header>
	);
}

export default MainNavigation;
