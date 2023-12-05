import React, { useState, useEffect } from 'react';

//styles
import 'bootstrap/dist/css/bootstrap.min.css';

function NetworkExplorer() {


    const [data, setData] = useState(null);

    useEffect(() => {
        const getWelcome = async () => {
          try {
            const res = await fetch('http://localhost:3333/welcome');
            const dataJson = await res.json();
            setData(dataJson);
          } catch (error) {
            console.error('Error obtaining welcome page from backend!!', error);
          }
        };
        getWelcome();
    }, []);

	return (
		<div className="container vh-100 overflow-auto">
			<div className="bg-white text-black text-center py-4 ">
				<h4>Explore Blocks and Transactions from Private Ethereum Network</h4>
				<h5>--Under construction--</h5>
			</div>
		</div>
	);
}
export default NetworkExplorer;