//styles
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
	return (
		<footer className="bg-dark text-white text-center py-3 fixed-bottom" >
			<div className="container">
                <p>
                    <ul className="list-inline">
                        <li className="list-inline-item"><a href="/">Home</a></li>
                        <li className="list-inline-item"><a href="/about">About us</a></li>
                        <li className="list-inline-item"><a href="/privacy">Privacy</a></li>
                        <li className="list-inline-item"><a href="/terms">Terms and Conditions</a></li>
                        <li className="list-inline-item"><a href="https://discord.com/"><img src="\src\assets\discord-icon.png" alt="Discord" width="30px" height="auto"></img></a></li>
                        <li className="list-inline-item"><a href="https://github.com/"><img src="\src\assets\github-icon.png" alt="Github" width="30px" height="auto"></img></a></li>
                        <li className="list-inline-item"><a href="https://twitter.com/"><img src="\src\assets\twitter-icon.png" alt="Twiter" width="30px" height="auto"></img></a></li>
                        <li className="list-inline-item"><a href="https://www.linkedin.com"><img src="\src\assets\linkedin-icon.png" alt="LinkedIn" width="30px" height="auto"></img></a></li>
                    </ul>
                </p>
            </div>
        </footer>
	);
}
export default Footer;