import { useEffect, useState } from 'react';
const { ethereum } = window;

export const useAccount = () => {
	const [account, setAccount] = useState(null);
	const [isLoadAccount, setIsLoadingAccount] = useState(true);
	const [hasErrorAccount, setHasErrorAccount] = useState(null);
	const [accountList, setAccountList] = useState([]);

	useEffect(() => {
		// If ethereum exists, requet chrome and connect to metamask
		setIsLoadingAccount(true);
		if (ethereum) {
			setHasErrorAccount(null);
			ethereum
				.request({ method: 'eth_requestAccounts' })
				.then(listOfAccount => {
					setAccount(listOfAccount[0]);
					setAccountList(listOfAccount.filter((_account, i) => i !== 0));
					setIsLoadingAccount(false);
				});
		} else {
			setHasErrorAccount('Not exist ethereum');
			setIsLoadingAccount(false);
		}
	}, []);

	useEffect(() => {
		const updateAccount = listOfAccount => {
			setAccount(listOfAccount[0]);
			setAccountList(listOfAccount.filter((_account, i) => i !== 0));
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

	return { account, isLoadAccount, hasErrorAccount, accountList };
};
