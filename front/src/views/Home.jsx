import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {

	const [selectedItem, setSelectedItem] = useState(null);

	const handleItemClick = (itemName) => {
		setSelectedItem(itemName);
	};

	return (
		<div className='Home'>
			<Header />
			<nav className='navbar navbar-expand-lg navbar-dark bg-secondary'>
				<div className='container'>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarNav'
						aria-controls='navbarNav'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarNav'>
						<ul className='navbar-nav'>
							<li className='nav-item'  onClick={() => handleItemClick('balance')}>
								<Link className={selectedItem === 'balance' ? 'nav-link active' : 'nav-link'} to={'/balance'}>
									Balance
								</Link>
							</li>
							<li className='nav-item'  onClick={() => handleItemClick('faucet')}>
								<Link className={selectedItem === 'faucet' ? 'nav-link active' : 'nav-link'} to={'/faucet'}>
									Faucet
								</Link>
							</li>
							<li className='nav-item'  onClick={() => handleItemClick('transact')}>
								<Link className={selectedItem === 'transact' ? 'nav-link active' : 'nav-link'} to={'/transact'}>
									Transact
								</Link>
							</li>
							<li className='nav-item'  onClick={() => handleItemClick('networkExplorer')}>
								<Link className={selectedItem === 'networkExplorer' ? 'nav-link active' : 'nav-link'} to={'/networkExplorer'}>
									Explorer
								</Link>
							</li>
							<li className='nav-item'  onClick={() => handleItemClick('networkManagement')}>
								<Link className={selectedItem === 'networkManagement' ? 'nav-link active' : 'nav-link'}  to={'/networkManagement'}>
									Network Manager
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<div className='container'>
				<Outlet />
			</div>

			<Footer />
		</div>
	);
}
export default Home;
