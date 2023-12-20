import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NetworkManagement() {
	const [nodeList, setNodeList] = useState('');
	const [containerName, setContainerName] = useState('');

	useEffect(() => {
		// Invocar la ruta de Node.js al cargar el componente
		fetch('http://localhost:3333/nodeList/')
			.then(response => response.text())
			.then(data => setNodeList(data))
			.catch(error => console.error('Error al obtener datos:', error));
	}, []);

	const handleDelete = async () => {

		console.log(`Front-Eliminando Contenedor ${containerName}`);

		const body = {
			containerName: containerName
		};

		try {
		  // Realiza una solicitud al servidor para eliminar el contenedor Docker
		  const response = await fetch(`http://localhost:3333/nodeList`, {
			body: JSON.stringify(body),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		  });
	
		  if (response.ok) {
			console.log(`Front-Contenedor ${containerName} eliminado exitosamente.`);
		  } else {
			console.error(`Front-Error al eliminar el contenedor ${containerName}:response.ko`);
		  }
		} catch (error) {
		  console.error('Front-Error de red:', error);
		}
	};

	const handleCreate = async () => {

		console.log(`Front-Crear Contenedor `);
		//TODO

	};

	const handleStop = async () => {

		console.log(`Stop network `);

		try {
			const route = `http://localhost:3333/stopNetwork`;
			const response = await axios.get(route);
			console.log(response);

		} catch (error) {
			console.error(error);
		}

	};

	const handleStart = async () => {

		console.log(`Start network `);
		try {
			const route = `http://localhost:3333/startNetwork`;
			const response = await axios.get(route);
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
					value={containerName}
					onChange={(e) => setContainerName(e.target.value)}
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
					value={containerName}
					onChange={(e) => setContainerName(e.target.value)}
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
