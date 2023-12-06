import { useEffect, useState } from 'react';
const { ethereum } = window;

export const useAccount = () => {
	const [account, setAccount] = useState(null);
	const [isLoadAccount, setIsLoadingAccount] = useState(true);
	const [hasErrorAccount, setHasErrorAccount] = useState(null);

	useEffect(() => {
		// If ethereum exists, requet chrome and connect to metamask
		setIsLoadingAccount(true);
		if (ethereum) {
			ethereum.request({ method: 'eth_requestAccounts' }).then(account => {
				setAccount(account[0]);
				setIsLoadingAccount(false);
				ethereum.on('accountsChanged', i => {
					setAccount(i[0]);
				});
			});
		} else {
			setHasErrorAccount('Not exist ethereum');
		}
	}, []);

	return { account, isLoadAccount, hasErrorAccount };
};
