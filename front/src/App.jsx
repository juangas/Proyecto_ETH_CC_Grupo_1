import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Home from './views/Home';
import Faucet from './views/Faucet';
import Balance from './views/Balance';
import Transact from './views/Transact';
import NetworkManagement from './views/NetworkManagement';
import NetworkExplorer from './views/NetworkExplorer';
import About from './views/About';
import Privacy from './views/Privacy';
import Terms from './views/Terms';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />}>
					<Route path='/balance' element={<Balance />} />
					<Route path='/faucet' element={<Faucet />} />
					<Route path='/transact' element={<Transact />} />
					<Route path='/networkManagement' element={<NetworkManagement />} />
					<Route path='/networkExplorer' element={<NetworkExplorer />} />
					<Route path='/about' element={<About />} />
					<Route path='/privacy' element={<Privacy />} />
					<Route path='/terms' element={<Terms />} />
					<Route path='*' element={<h3>INVALID ROUTE</h3>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
export default App;
