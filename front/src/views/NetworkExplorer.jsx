import { useEffect } from 'react';

function NetworkExplorer() {
	
	useEffect(() => {
		const getWelcome = async () => {
			try {
				const res = await fetch('http://localhost:3333/welcome');
				const dataJson = await res.json();
				setData(dataJson);
			} catch (error) {
				console.error('Error obtaining welcome page from backend!!', error);
			}
		};
		getWelcome();
	}, []);

	return (
		<div className='vh-100 '>
			<div className='bg-white text-black text-center py-4 '>
				<iframe
					src="http://localhost/"
					title="Title"
					width="100%"
					height="600px"
				/>
			</div>
		</div>
	);
}
export default NetworkExplorer;
