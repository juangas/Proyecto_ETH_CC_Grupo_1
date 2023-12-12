import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const { ethereum } = window;

export const useBalance = account => {
	const [balance, setBalance] = useState(null);

	useEffect(() => {
		if (ethereum && account) {
			const provider = new ethers.BrowserProvider(ethereum);
			provider.getBalance(account).then(balance => {
				setBalance(ethers.formatEther(balance));
			});
		}
	}, [account]);

	return { balance };
};
