import WalletInfo from '../components/WalletInfo';
import { useAccount } from '../hooks/useAccount';

export default function Faucet() {
	const { account } = useAccount();
	const moreMoney = event => {
		event.preventDefault();

		const { value } = event.target.value;

		const body = {
			to: account,
			value,
		};
		console.log(body);
	};
	return (
		<>
			<div>
				<WalletInfo />
			</div>
			<div className='row'>
				<div className='col'></div>
				<div className='col-sm-6'>
					<div className='card'>
						<div className='card-body'>
							<form onSubmit={moreMoney} className='row g-3'>
								<h5 className='card-title'>Load wallet</h5>
								<input
									type='number'
									placeholder='1 eth'
									name='value'
									id='loadWallet'
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
		</>
	);
}
