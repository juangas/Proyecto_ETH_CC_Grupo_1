import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

//styles
import 'bootstrap/dist/css/bootstrap.min.css';


//Get instance of ethereum object from chrome
const {ethereum} = window

function Balance() {

    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);

    useEffect(()=>{
        //If ethereum exists, requet chrome and connect to metamask
        ethereum && ethereum.request({method:'eth_requestAccounts'}).then(account => {
            setAccount(account[0])
            ethereum.on('accountsChanged', (i)=>{
                setAccount(i[0])
            })
        })
    },[]); //Dependency: blank -> reload component only 1st time

    useEffect(()=>{

        if(account){
            
            const provider = new ethers.BrowserProvider(ethereum);

            provider.getBalance(account).then(balance => {
                setBalance(ethers.formatEther(balance));
                console.log( ethers.formatEther(balance));
            });
            
        }
        
    },[account]); //Dependency: account -> reload component when account change in metamask


    const handleGetBalance = async () => {
        /*
        try {
          // Request: http://localhost:3333/balance/:address
          const response = await fetch('http://localhost:3333/balance/0x53db8233B2448fa6003d62a51318b71aab0aDc2e');
          const data = await response.json();
          
          console.log(data);
        } 
        catch (error) {
            console.error('Error in request: http://localhost:3333/balance/:address', error);
        }
        */
      };

    if(!ethereum){

        return (
            <div className="container vh-100 overflow-auto">
                <div className="bg-white text-black text-center py-4 ">
                    <h5>Metamask not installed</h5>
                </div>
            </div>
        ); 
    }

    //Return result with current balance
	return (
		<div className="container vh-100 overflow-auto">
			<div className="bg-white text-black text-center py-4">
                <div className="bg-light border p-2">
                    <h5><img src="\src\assets\metamask.png" alt="Metamask Logo" width="30" height="auto"></img>Current account:</h5>
                    <h6><b>Adrress:</b> {account ? account : 'Loading...'}</h6>
                    <h6><b>Balance:</b> {balance ? balance : 'Loading...'}</h6>
                </div>
			</div>

            
            <div class="row text-left"> 
                <div class="col-md-6">
                    <form>
                        <div class="form-group">
                            <label for="fieldAccount"><h5>Account</h5></label>
                            <input type="text" class="form-control" id="fieldAccount" placeholder="Insert here a valid account to get balance"></input>
                        </div>
                        <button type="submit" class="btn btn-dark" >Get Balance</button>
                    </form>
                </div>
            </div>

            <div className="container vh-100 overflow-auto">
			<div className="bg-white text-black text-center py-4 ">
				<h5>--Under construction--</h5>
			</div>
		</div>

		</div>
	);
}
export default Balance;