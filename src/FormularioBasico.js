import React, { useState } from 'react';
import {Formik} from 'formik'

const FormularioBasico = () => {

	const [formularioEnviado, setformularioEnviado] = useState(false)
	return (
		<>
		<Formik
			initialValues={ //Le indicamos a Formik cuales van a ser los valores iniciales del formulario, esto es un objeto que contiene esos valores. Para usarlo en mi formulario tengo que importarlo en la funcion y luego accediendo a las propiedades de este objeto
				{
					name: '',
					correo: ''
				}}
				
			//para validar los campos del formulario le pasamos a la funcion como parametros los initialValues
			validate={ (valores) => {
				let errores = {} //Es un objeto al que le asignamos las propiedades de initialValues para manejar los errores 

				if (!valores.correo) {
					errores.correo = 'Por favor ingresa un correo'
				}

				return errores; //Devolvemos el objeto para usarlo dentro del formulario de abajo con errors
			}}

			onSubmit={(valores, {resetForm})=>{ //Esta es la funcion que ejecutara cuando en el formulario se presiona el boton enviar
				//Aca recupero los valores y hago lo que quiero con ellos, por ejemplo enviarlos a una base de datos o a una funcion para que los utilice tambien
				
				resetForm(); //limpia los campos de los formularios cuando se presiona el boton enviar
				setformularioEnviado(true) //Cambio el estado de formularioEnviado para que se muestre el mensaje de exito mas abajo
			
				//Ahora quiero que ese mensaje desaparezca despues de un determinado tiempo
				setTimeout(() => setformularioEnviado(false), 5000); //Cambio el estado nuevamente a false luego de 5s
			
				//Asi accedemos a los valores que definimos en el objeto de arriba
				console.log('Nombre: ' + valores.name)
				console.log('Correo: ' + valores.correo)
				console.log('Enviando formulario...')
			}}
		>
			{( {handleSubmit, values, handleChange, handleBlur, errors} )=>( //como es una funcion podemos pasarle diferentes propiedades, en este caso le pasamos handleSubmit para usarla abajo
				<form className='formulario' onSubmit={handleSubmit}>
					{/*por defecto es un objeto vacio, pero cuando se dispara el error se agrega el manejo que hicimos mas arriva en validate() */}
					{/* {console.log(errors)}  */}
				<div>
					<label htmlFor='nombre'>Nombre</label>
					<input type="text" 
					id='nombre' 
					name='nombre' 
					placeholder='Federico Caballero' 
					value={values.name}
					onChange={handleChange} //Esta funcion es la encargada de cambiar el valor del value dentro del initialValues, y es propia de Formik por eso debe ser importada arriba en la funcion 
					onBlur={handleBlur}
					/>
				</div>
				<div>
					<label htmlFor='correo'>Correo</label>
					<input type="text" 
					id='correo' 
					name='correo' 
					placeholder='correo@correo.com' 
					value={values.correo}
					onChange={handleChange} //Esta funcion es la encargada de cambiar el valor del value dentro del initialValues, y es propia de Formik por eso debe ser importada arriba en la funcion
					onBlur={handleBlur}
					/>
					{/* Aca hacemo uso de errors cuando se cumple la condicion del correo no valido */}
					{errors.correo && <div className='error'>{errors.correo}</div>} {/**"Si existe un error en el campo correo entonces mostramelo dentro de este div" */}
				</div>
				<button type='submit'>Enviar</button>
				{ formularioEnviado && <p className='exito'> Formulario enviado con éxito!</p>} {/* Esto lo podemos manejar con un estado (useState) nativo de React */}
				
			</form>
			
			)}
			
		</Formik>
			
		</>
	);
}
 
export default FormularioBasico;