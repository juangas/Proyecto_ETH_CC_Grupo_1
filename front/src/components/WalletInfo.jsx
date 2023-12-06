import PropTypes from 'prop-types';
import { useAccount } from '../hooks/useAccount';
import { useBalance } from '../hooks/useBalance';

export default function WalletInfo({ isLoading }) {
	const { account } = useAccount();
	const { balance } = useBalance(account, isLoading);

	return (
		<div className='bg-white text-black text-center py-4'>
			<div className='bg-light border p-2'>
				<h5>
					<img
						src='\src\assets\metamask.png'
						alt='Metamask Logo'
						width='30'
						height='auto'
					></img>
					Current account:
				</h5>
				<h6>
					<b>Adrress:</b> {account || 'Loading...'}
				</h6>
				<h6>
					<b>Balance:</b> {balance || 'Loading...'}
				</h6>
			</div>
		</div>
	);
}

WalletInfo.propTypes = {
	isLoading: PropTypes.bool,
};
