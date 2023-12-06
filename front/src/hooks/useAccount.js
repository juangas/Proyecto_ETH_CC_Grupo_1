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

	useEffect(() => {
		const updateAccount = listOfAccount => {
			setAccount(listOfAccount[0]);
		};
		if (ethereum) {
			ethereum.on('accountsChanged', updateAccount);
		}

		return () => {
			if (ethereum) {
				ethereum.off('accountsChanged', updateAccount);
			}
		};
	}, []);

	return { account, isLoadAccount, hasErrorAccount };
};
