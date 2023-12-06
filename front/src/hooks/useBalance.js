import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const { ethereum } = window;

export const useBalance = (account, isLoading) => {
	console.log(isLoading);
	const [balance, setBalance] = useState(null);

	useEffect(() => {
		if (ethereum && account) {
			const provider = new ethers.BrowserProvider(ethereum);
			provider.getBalance(account).then(balance => {
				setBalance(ethers.formatEther(balance));
			});
		}
	}, [account, isLoading]);

	return { balance };
};
