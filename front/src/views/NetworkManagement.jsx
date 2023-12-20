import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NetworkManagement() {
	const [nodeList, setNodeList] = useState('');
	// const [containerName, setContainerName] = useState('');
	const [containerNameCreate, setContainerNameCreate] = useState('');
	const [containerNameDelete, setContainerNameDelete] = useState('');

	useEffect(() => {
		// Invocar la ruta de Node.js al cargar el componente
		fetch('http://192.168.56.104:3335/nodeList')
			.then(response => response.text())
			.then(data => setNodeList(data))
			.catch(error => console.error('Error al obtener datos:', error));
	}, []);

	const handleDelete = async () => {

		console.log(`Front-Eliminando Contenedor ${containerNameDelete}`);


		try {
		  // Realiza una solicitud al servidor para eliminar el contenedor Docker
		  const response = await axios.delete(`http://192.168.56.104:3335/stop_node/${containerNameDelete}`);
		  console.log(response)
		} catch (error) {
		  console.error('Front-Error de red:', error);
		}
	};

	const handleCreate = async () => {

		console.log(`Front-Crear Contenedor ${containerNameCreate}`);


		try {
		  // Realiza una solicitud al servidor para eliminar el contenedor Docker
		  const response = await axios.put(`http://192.168.56.104:3335/add_node/${containerNameCreate}`);
		  console.log(response)
		} catch (error) {
		  console.error('Front-Error de red:', error);
		}

	};

	const handleStop = async () => {

		console.log(`Stop network `);

		try {
			const route = `http://192.168.56.104:3335/stop_network/private_network_1`;
			const response = await axios.delete(route);
			console.log(response);

		} catch (error) {
			console.error(error);
		}

	};

	const handleStart = async () => {

		console.log(`Start network `);
		try {
			const route = `http://192.168.56.104:3335/start_network`;
			const data = {
				network_name: "private_network_1",
				validator_nodes: "3",
				normal_nodes: "2",
				host_http_port: "8545"
			}
			const headers = {
				'Content-Type': 'application/json'
			}
			const response = await axios.put(route, data, headers);
			console.log(response);

		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='vh-100 overflow-auto bg-white text-black text-center py-4'>
			<h4>Private Network Node List</h4>
			<div>
				<div
					style={{
						fontSize: '14px', // Ajusta el tamaño de la fuente según sea necesario
						whiteSpace: 'nowrap', // Evita saltos de línea
						overflowX: 'auto', // Agrega una barra de desplazamiento horizontal si es necesario
					}}
					dangerouslySetInnerHTML={{ __html: nodeList }}
				/>
			</div>
			<h4>Network status</h4>
			<form>
				<button type="button" onClick={handleStop}>
				STOP NETWORK
				</button>
				<button type="button" onClick={handleStart}>
				START NETWORK
				</button>
			</form>
			<h4>Delete node</h4>
			<form>
				<label>
				Container name:
				<input
					type="text"
					value={containerNameDelete}
					onChange={(e) => setContainerNameDelete(e.target.value)}
				/>
				</label>
				<button type="button" onClick={handleDelete}>
				Delete node
				</button>
			</form>
			<h4>Create node</h4>
			<form>
				<label>
				Container name:
				<input
					type="text"
					value={containerNameCreate}
					onChange={(e) => setContainerNameCreate(e.target.value)}
				/>
				</label>
				<button type="button" onClick={handleCreate}>
				Create node
				</button>
			</form>

		</div>
	);
}
export default NetworkManagement;
