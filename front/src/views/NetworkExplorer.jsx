import { useEffect } from 'react';

function NetworkExplorer() {

	return (
		<div className='vh-100 '>
			<div className='bg-white text-black text-center py-4 '>
				<iframe
					src="http://localhost/"
					title="Title"
					width="100%"
					height="800px"
				/>
			</div>
		</div>
	);
}
export default NetworkExplorer;
