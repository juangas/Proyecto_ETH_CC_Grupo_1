import { Link } from 'react-router-dom';
function Header() {
	return (
		<div className='bg-white text-black text-center py-4'>
			<Link to={'/'}>
				<img
					src='\src\assets\logo.png'
					alt='Service Logo'
					width='100'
					height='auto'
				></img>
			</Link>
			<h2 className='bg-dark text-white p-3'>
				Build Private Ethereum Networks
			</h2>
		</div>
	);
}
export default Header;
