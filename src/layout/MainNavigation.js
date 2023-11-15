import { Link } from "react-router-dom";

function MainNavigation() {
	return (
		<header>
			<nav className="navbar navbar-expand-lg bg-body-secondary">
				<div className="container-fluid">
					<Link to="/" className="navbar-brand">
						Car Catalog
					</Link>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link to="/" className="nav-link">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/vehicles" className="nav-link">
								Vehicles
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}

export default MainNavigation;
