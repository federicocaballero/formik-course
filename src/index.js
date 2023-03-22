import React from 'react';
import ReactDOM from 'react-dom';
import FormularioBasico from './FormularioBasico';
import FormularioLimpio from './FormularioLimpio';
import './index.css';


ReactDOM.render(
	<React.StrictMode>
		<div className="contenedor">
			<h1>Formulario basico</h1>
			<FormularioBasico/>
			<h1>Formulario limpio</h1>
			<FormularioLimpio/>
		</div>
	</React.StrictMode>,
	document.getElementById('root')
);