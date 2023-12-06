import { Link } from 'react-router-dom';
function About() {
	return (
		<div className='vh-100 overflow-auto'>
			<h1 className='text-center'>About Us</h1>
			<p>Welcome to "CodeCrypto-EthereumTeamProject-Team1"! </p>
			<p>
				We are dedicated to providing tools to deploy and manage easily PRIVATE
				ETHEREUM NETWORKS based on geth ethereum client{' '}
				<Link to={'https://geth.ethereum.org/docs'} target='_blank'>
					(geth link)
				</Link>
			</p>
			<p>
				<strong>Our Mission</strong>
			</p>
			<p>
				At "CodeCrypto-EthereumTeamProject-Team1", our mission is to create easy
				experiences when creating your own PRIVATE ETHEREUM NETWORK deployed in
				docker containers according to the standadrs described by
				CodecryptoAcademy.
			</p>
			<p>
				<strong>Our Team</strong>
			</p>
			<p>
				We have a passionate and talented team committed to delivering the best
				experience to our customers. Each team member brings a unique set of
				skills and expertise to the team.
			</p>
			<p>
				<strong>History</strong>
			</p>
			<p>
				Founded in November 2023, "CodeCrypto-EthereumTeamProject-Team1" has
				grown thanks to the effort of a group of students from
				CodecryptoAcademy. We are proud of our journey and excited about the
				future.
			</p>
			<p>
				<strong>Contact Us</strong>
			</p>
			<p>
				If you have any questions or want to learn more about us, please don't
				hesitate to contact us
			</p>
		</div>
	);
}

export default About;
