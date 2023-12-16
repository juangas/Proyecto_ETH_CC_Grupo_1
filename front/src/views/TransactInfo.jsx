import { useState, useEffect } from 'react';
import WalletInfo from '../components/WalletInfo';
import { useParams } from 'react-router-dom';

export default function TransactInfo() {
	const { txHash } = useParams();
	const [transaction, setTransaction] = useState(null);

	useEffect(() => {
		const fetchTx = async () => {
			try {
				console.log('hash', txHash);
				const response = await fetch(
					`http://localhost:3333/transaction/${txHash}`,
				);
				const data = await response.json();
				setTransaction(data);
			} catch (error) {
				console.error(error);
			}
		};

		if (txHash) {
			fetchTx();
		}
	}, [txHash]);

	return (
		<div className='transaction-info'>
			<WalletInfo />
			{transaction && (
				<div className='container'>
					<h2 className='my-4'>Detalles de la transacción</h2>

					<div className='row'>
						<div className='col-md-6'>
							<h4>Remitente:</h4>
							<p>{transaction.from}</p>
						</div>
						<div className='col-md-6'>
							<h4>Destinatario:</h4>
							<p>{transaction.to}</p>
						</div>
					</div>

					<div className='row'>
						<div className='col-md-6'>
							<h4>Gas:</h4>
							<p>{transaction.gas}</p>
						</div>
						<div className='col-md-6'>
							<h4>Precio del gas:</h4>
							<p>{transaction.gasPrice}</p>
						</div>
					</div>

					<div className='row'>
						<div className='col-md-6'>
							<h4>Máximo de comisión por gas:</h4>
							<p>{transaction.maxFeePerGas}</p>
						</div>
						<div className='col-md-6'>
							<h4>Máximo de tarifa de prioridad por gas:</h4>
							<p>{transaction.maxPriorityFeePerGas}</p>
						</div>
					</div>

					<div className='row'>
						<div className='col-md-6'>
							<h4>Hash:</h4>
							<p>{transaction.hash}</p>
						</div>
						<div className='col-md-6'>
							<h4>Nonce:</h4>
							<p>{transaction.nonce}</p>
						</div>
					</div>

					<div className='row'>
						<div className='col-md-6'>
							<h4>Valor:</h4>
							<p>{transaction.value}</p>
						</div>
						<div className='col-md-6'>
							<h4>Tipo:</h4>
							<p>{transaction.type}</p>
						</div>
					</div>

					<div className='row'>
						<div className='col-md-6'>
							<h4>Access List:</h4>
							<p>
								{transaction.accessList.length === 0
									? 'No hay lista de acceso'
									: transaction.accessList.join(', ')}
							</p>
						</div>
						<div className='col-md-6'>
							<h4>Chain ID:</h4>
							<p>{transaction.chainId}</p>
						</div>
					</div>

					<div className='row'>
						<div className='col-md-6'>
							<h4>V:</h4>
							<p>{transaction.v}</p>
						</div>
						<div className='col-md-6'>
							<h4>R:</h4>
							<p>{transaction.r}</p>
						</div>
					</div>

					<div className='row'>
						<div className='col-md-6'>
							<h4>S:</h4>
							<p>{transaction.s}</p>
						</div>
						<div className='col-md-6'>
							<h4>Data:</h4>
							<p>{transaction.data}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
