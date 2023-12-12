import WalletInfo from '../components/WalletInfo';
import { ethers } from 'ethers';
import { useAccount } from '../hooks/useAccount';
import { useState } from 'react';

const { ethereum } = window;

function Transact() {
	const { account, accountList } = useAccount();
	const [isLoadingTx, setIsLoadingTx] = useState(false);
	const [tx, setTx] = useState(null);
	const [errorTx, setErrorTx] = useState(null);

	const sendTransaction = async event => {
		event.preventDefault();
		const form = event.target;

		const formData = new FormData(form);
		const walletValueTo = formData.get('walletSelect');
		const transactionValue = formData.get('value');

		const params = {
			from: account,
			to: walletValueTo,
			gas: '1',
			gasLimit: '1',
			value: ethers.parseEther(transactionValue).toString(),
		};
		setIsLoadingTx(true);
		setErrorTx(null);
		setTx(null);
		ethereum
			.request({ method: 'eth_sendTransaction', params: [params] })
			.then(hash => {
				setTx(hash);
			})
			.catch(error => {
				setErrorTx(error);
			})
			.finally(() => {
				setIsLoadingTx(false);
			});

		form.reset();
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
							<form onSubmit={sendTransaction} className='row g-3'>
								<h5 className='card-title'>Make a transfer</h5>
								<select
									className='form-select'
									aria-label='wallet select'
									name='walletSelect'
								>
									<option value=''>Choose a wallet</option>
									{accountList.length > 0 &&
										accountList.map(account => (
											<option key={account} value={account}>
												{account}
											</option>
										))}
								</select>
								<input
									type='text'
									pattern='^[0-9]*(\.[0-9]+)?$'
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
							<span style={{ wordBreak: 'break-all' }}>{tx}</span>
						</div>
					)}
					{!isLoadingTx && errorTx && (
						<div className='alert alert-danger' role='alert'>
							<p>{errorTx.message}</p>
						</div>
					)}
				</div>
				<div className='col'></div>
			</div>
		</div>
	);
}
export default Transact;
