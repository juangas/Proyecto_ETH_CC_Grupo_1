import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom'

//styles
import 'bootstrap/dist/css/bootstrap.min.css';

//Components
import Home from './Home';
import Balance from './Balance';
import Faucet from './Faucet';
import Transact from './Transact';
import NetworkManagement from './NetworkManagement';
import NetworkExplorer from './NetworkExplorer';
import About from './About';
import Privacy from './Privacy';
import Terms from './Terms';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home></Home>}>
					<Route path="/balance" element={<Balance></Balance>}/>
					<Route path="/faucet" element={<Faucet></Faucet>}/>
					<Route path="/transact" element={<Transact></Transact>}/>
					<Route path="/networkManagement" element={<NetworkManagement></NetworkManagement>}/>
					<Route path="/networkExplorer" element={<NetworkExplorer></NetworkExplorer>}/>
					<Route path="/about" element={<About></About>}/>
					<Route path="/privacy" element={<Privacy></Privacy>}/>
					<Route path="/terms" element={<Terms></Terms>}/>
					<Route path="*" element={<h3>INVALID ROUTE</h3>}/> 
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
export default App;
