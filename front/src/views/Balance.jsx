// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import WalletInfo from '../components/WalletInfo';

// Get instance of ethereum object from chrome
const { ethereum } = window;

function Balance() {
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
		<div className='vh-100'>
			<WalletInfo />

			<div className='row text-left'>
				<div className='col'></div>
				<div className='col-md-6'>
					<form>
						<div className='form-group'>
							<label htmlFor='fieldAccount'>
								<h5>Account</h5>
							</label>
							<input
								type='text'
								className='form-control'
								id='fieldAccount'
								placeholder='Insert here a valid account to get balance'
							></input>
						</div>
						<button type='submit' className='btn btn-dark'>
							Get Balance
						</button>
					</form>
				</div>
				<div className='col'></div>
			</div>

			<div className='vh-100'>
				<div className='bg-white text-black text-center py-4 '>
					<h5>--Under construction--</h5>
				</div>
			</div>
		</div>
	);
}
export default Balance;
