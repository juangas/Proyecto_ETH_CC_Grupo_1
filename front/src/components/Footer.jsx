import { Link } from 'react-router-dom';
function Footer() {
	return (
		<footer className='bg-dark text-white text-center py-3 fixed-bottom'>
			<div className='container'>
				<p>
					<ul className='list-inline'>
						<li className='list-inline-item'>
							<Link to={'/'}>Home</Link>
						</li>
						<li className='list-inline-item'>
							<Link to={'/about'}>About us</Link>
						</li>
						<li className='list-inline-item'>
							<Link to={'/privacy'}>Privacy</Link>
						</li>
						<li className='list-inline-item'>
							<Link to={'/terms'}>Terms and Conditions</Link>
						</li>
						<li className='list-inline-item'>
							<Link to={'https://discord.com/'} target='_blank'>
								<img
									src='\src\assets\discord-icon.png'
									alt='Discord'
									width='30px'
									height='auto'
								></img>
							</Link>
						</li>
						<li className='list-inline-item'>
							<Link to={'https://github.com/'} target='_blank'>
								<img
									src='\src\assets\github-icon.png'
									alt='Github'
									width='30px'
									height='auto'
								></img>
							</Link>
						</li>
						<li className='list-inline-item'>
							<Link to={'https://twitter.com/'} target='_blank'>
								<img
									src='\src\assets\twitter-icon.png'
									alt='Twiter'
									width='30px'
									height='auto'
								></img>
							</Link>
						</li>
						<li className='list-inline-item'>
							<Link to={'https://www.linkedin.com'} target='_blank'>
								<img
									src='\src\assets\linkedin-icon.png'
									alt='LinkedIn'
									width='30px'
									height='auto'
								></img>
							</Link>
						</li>
					</ul>
				</p>
			</div>
		</footer>
	);
}
export default Footer;
