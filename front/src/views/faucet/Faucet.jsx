import { useState } from 'react';
import WalletInfo from '../../components/WalletInfo';
import { useAccount } from '../../hooks/useAccount';
import './faucet.scss';
import { Link } from 'react-router-dom';

export default function Faucet() {
	const { account } = useAccount();
	const [tx, setTx] = useState(null);
	const [errorTx, setErrorTx] = useState(null);
	const [isLoadingTx, setIsLoadingTx] = useState(false);

	const moreMoney = async event => {
		event.preventDefault();

		const { value } = event.target.value;

		const body = {
			to: account,
			value,
		};
		setIsLoadingTx(true);
		setErrorTx(null);
		setTx(null);
		try {
			const result = await fetch('http://localhost:3333/faucet', {
				body: JSON.stringify(body),
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!result.ok) {
				setErrorTx('Error en la transaccion');
			} else {
				const response = await result.json();
				setTx(response);
			}
		} catch (error) {
			console.error(error);
			setErrorTx('Error en la transaccion');
		}
		setIsLoadingTx(false);
	};

	return (
		<div className='faucet'>
			<WalletInfo />
			<div className='row'>
				<div className='col'></div>
				<div className='col-sm-6'>
					<div className='card'>
						{isLoadingTx && (
							<div className='overlay'>
								<div
									className='spinner-border text-secondary'
									role='status'
								></div>
							</div>
						)}
						<div className='card-body'>
							<form onSubmit={moreMoney} className='row g-3'>
								<h5 className='card-title'>Load wallet</h5>
								<input
									type='number'
									placeholder='1 eth'
									name='value'
									id='loadWallet'
									required
								/>
								<button className='btn btn-dark' type='submit'>
									SEND
								</button>
							</form>
						</div>
					</div>
				</div>
				<div className='col'></div>
			</div>
			<div className='row'>
				<div className='col'></div>
				<div className='col-sm-6'>
					{!isLoadingTx && tx && (
						<div className='alert alert-success' role='alert'>
							Transaction successfully.
							<br /> The hash is{' '}
							<span style={{ wordBreak: 'break-all' }}>
								<Link to={`/transaction/${tx.transactionHash}`}>
									{tx.transactionHash}
								</Link>
							</span>
						</div>
					)}
					{!isLoadingTx && errorTx && (
						<div className='alert alert-danger' role='alert'>
							Oops! somethings was wrong
						</div>
					)}
				</div>
				<div className='col'></div>
			</div>
		</div>
	);
}
