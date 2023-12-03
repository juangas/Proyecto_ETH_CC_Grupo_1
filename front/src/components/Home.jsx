import { Outlet } from "react-router-dom";

//styles
import 'bootstrap/dist/css/bootstrap.min.css';

//Components
import Header from './Header';
import Footer from './Footer';


function Home() {
	return (
		<div className="Home">
            <Header></Header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/network">Network Management</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
            <Outlet/>
            <Footer></Footer>
        </div>
	);
}
export default Home;