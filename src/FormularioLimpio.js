import React, { useState } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik'

const FormularioLimpio = () => {

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
			{( { errors} )=>( //como es una funcion podemos pasarle diferentes propiedades, en este caso le pasamos handleSubmit para usarla abajo
				<Form className='formulario'>
					{/*por defecto es un objeto vacio, pero cuando se dispara el error se agrega el manejo que hicimos mas arriva en validate() */}
					{/* {console.log(errors)}  */}
				<div>
					<label htmlFor='nombre'>Nombre</label>
					<Field type="text" 
					id='nombre' 
					name='nombre' 
					placeholder='Federico Caballero' 
					/>
				</div>
				<div>
					<label htmlFor='correo'>Correo</label>
					<Field type="text" 
					id='correo' 
					name='correo' 
					placeholder='correo@correo.com' 
					/>
					{/* Usamos el componente ErrorMessage para el manejo de errores y le pasamos el nombre del error que queremos comprobar */}
                    <ErrorMessage name='correo' component={() => ( //Cuando hay un error quiero que me renderice este div con la informacion
                        <div className='error'>{errors.correo}</div> 
                    )} />
					
				</div>

                {/* El componente Field se puede comportar como input, radio, select etc.
                
                Ejemplo con Field como select */}
                <div>   
                    <Field name="pais" as="select">
                        <option value="Argentina" >Argentina</option>
                        <option value="Brasil" >Brasil</option>
                        <option value="Francia" >Francia</option>
                    </Field>
                </div>

                {/* Ejemplo con radio buttons */}
                <div>
                    <label>
                        <Field type="radio" name="sexo" value="hombre" />Hombre                         
                    </label>
                    <label>
                        <Field type="radio" name="sexo" value="mujer" />Mujer                         
                    </label>
                </div>

                {/* Ejemplo como textarea */}
                <div>
                    <Field as="textarea" name="mensaje" placeholder="Ingrese aqui su mensaje" />
                </div>
				<button type='submit'>Enviar</button>
				{ formularioEnviado && <p className='exito'> Formulario enviado con éxito!</p>} {/* Esto lo podemos manejar con un estado (useState) nativo de React */}
				
			</Form>
			
			)}
			
		</Formik>
			
		</>
	);
}
 
export default FormularioLimpio;