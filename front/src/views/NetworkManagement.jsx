import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NetworkManagement() {
	const [nodeList, setNodeList] = useState('');

	useEffect(() => {
		// Invocar la ruta de Node.js al cargar el componente
		fetch('http://localhost:3333/nodeList/')
			.then(response => response.text())
			.then(data => setNodeList(data))
			.catch(error => console.error('Error al obtener datos:', error));
	}, []);

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
		</div>
	);
}
export default NetworkManagement;
