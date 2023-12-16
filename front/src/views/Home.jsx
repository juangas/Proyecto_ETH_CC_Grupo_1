import { Outlet, Link } from 'react-router-dom';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
	return (
		<div className='d-flex flex-column min-vh-100'>
			<div className='mb-auto'>
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
								<li className='nav-item'>
									<Link className='nav-link' to={'/balance'}>
										Balance
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to={'/faucet'}>
										Faucet
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to={'/transact'}>
										Transact
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to={'/networkExplorer'}>
										Explorer
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to={'/networkManagement'}>
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
			</div>
			<Footer className='fixed-bottom' />
		</div>
	);
}
export default Home;
