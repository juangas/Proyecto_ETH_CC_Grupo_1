import { useState, useEffect } from 'react';

function NetworkExplorer() {
	const [numblock, setNumblock] = useState(10);
	const [offset, setOffset] = useState(0);
	const [data, setData] = useState([]);

	const handleSelectChange = event => {
		const selectedValue = parseInt(event.target.value);
		setNumblock(selectedValue);
	};

	useEffect(() => {
		const getWelcome = async () => {
			try {
				const res = await fetch(
					`http://localhost:3333/lastBlocks?numblock=${numblock}&offset=${offset}`,
				);
				const dataJson = await res.json();
				console.log(dataJson);
				setData(dataJson);
			} catch (error) {
				console.error('Error obtaining welcome page from backend!!', error);
			}
		};
		getWelcome();
	}, [numblock, offset]);

	const formattedDate = timestamp => {
		const date = new Date(timestamp * 1000);

		// Obtener los componentes de la fecha
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear().toString();
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');

		const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
		return formattedDate;
	};

	return (
		<div className='vh-100 overflow-auto'>
			<div className='bg-white text-black text-center py-4 '>
				<h4>Explore Blocks and Transactions from Private Ethereum Network</h4>
				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>Number</th>
							<th scope='col'>Hash</th>
							<th scope='col'>Date</th>
						</tr>
					</thead>
					<tbody>
						{data.length > 0 &&
							data.map(block => (
								<tr key={block.number}>
									<td>{block.number}</td>
									<td>{block.hash}</td>
									<td>{formattedDate(block.timestamp)}</td>
								</tr>
							))}
					</tbody>
				</table>
				<div className='row'>
					<div className='col-8'></div>
					<div className='col'>
						<nav aria-label='Tabla de paginación'>
							<div className='pagination'>
								<button
									className='page-link'
									disabled={offset < 1}
									onClick={() => {
										if (offset < 1) return;
										setOffset(previous => previous - numblock);
									}}
								>
									Previous
								</button>
								<button
									className='page-link'
									onClick={() => setOffset(previous => previous + numblock)}
								>
									Next
								</button>
							</div>
						</nav>
					</div>
					<div className='col'>
						<select
							className='form-control mb-2 mr-sm-2'
							value={numblock}
							onChange={handleSelectChange}
						>
							<option value={10}>10</option>
							<option value={25}>25</option>
							<option value={50}>50</option>
							<option value={100}>100</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
}
export default NetworkExplorer;
