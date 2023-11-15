import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VehicleListPage from './pages/VehicleListPage';
import FavoritesPage from './pages/FavoritesPage';
import MainNavigation from './layout/MainNavigation';

function App() {
    return (
		<div>
			<MainNavigation />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/vehicles" element={<VehicleListPage />} />
				<Route path="/favorites" element={<FavoritesPage />} />
			</Routes>
		</div>
	);
}

export default App;
