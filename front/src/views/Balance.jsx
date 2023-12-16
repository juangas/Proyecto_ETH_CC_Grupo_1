import axios from 'axios';
import { ethers } from 'ethers';
import { useState } from 'react';

// styles
import WalletInfo from '../components/WalletInfo';

// Get instance of ethereum object from chrome
const { ethereum } = window;

function Balance() {
	const [inputAccount, setInputAccount] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [balance, setBalance] = useState('');

	const setAccount = async event => {
		setInputAccount(event.target.value);
	};

	const handleGetBalance = async event => {
		event.preventDefault();

		setIsLoading(true);
		setIsError(false);
		try {
			const route = `http://localhost:3333/balance/${inputAccount}`;
			const response = await axios.get(route);
			const balanceEth = ethers.formatEther(response.data.Balance);

			setBalance(balanceEth);
		} catch (error) {
			setIsError(true);
			console.error(error);
		}
		setIsLoading(false);
	};

	if (!ethereum) {
		return (
			<div className='vh-100 overflow-auto'>
				<div className='bg-white text-black text-center py-4 '>
					<h5>Metamask not installed</h5>
				</div>
			</div>
		);
	}

	// Return result with current balance
	return (
		<div className='Balance'>
			<WalletInfo />
			<div className='row'>
				<div className='col'></div>
				<div className='col-md-6'>
					<div className='card'>
						{isLoading && (
							<div className='overlay'>
								<div
									className='spinner-border text-secondary'
									role='status'
								></div>
							</div>
						)}
						<div className='card-body'>
							<form onSubmit={handleGetBalance} className='row g-3'>
								<h5 className='card-title'>Account</h5>
								<input
									type='text'
									placeholder='Insert here a valid account to get balance'
									name='account'
									id='fieldAccount'
									onChange={setAccount}
									required
								/>
								<button type='submit' className='btn btn-dark'>
									Get Balance
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
					{isLoading && (
						<div className='alert alert-success' role='alert'>
							Loading
						</div>
					)}
					{isError && (
						<div className='alert alert-danger' role='alert'>
							Oops! somethings was wrong
						</div>
					)}
					{!isLoading && !isError && balance && (
						<div className='alert alert-success' role='alert'>
							{balance}
						</div>
					)}
				</div>
				<div className='col'></div>
			</div>
		</div>
	);
}
export default Balance;
