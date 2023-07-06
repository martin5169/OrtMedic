## Introducción
La aplicación CuidApp permitirá gestionar turnos, solicitando, reprogramando o cancelando los mismos, ver todo el historial médico (estudios, vacunas, cirugías, etc) del usuario de manera centralizada, pagar bonos o costos extras y ver o cambiar el plan médico actual.

## Requerimientos del sistema
### Funcionales:
- Permitir al usuario solicitar, modificar o cancelar turnos
- Filtrar los turnos por fecha
- Permitir al usuario ver el historial médico
- Consultar el plan médico actual y permitir modificarlo
- Generar un QR/token como método de validación para la asistencia a los turnos de manera presencial
### No funcionales:
- La aplicación debe ser intuitiva y fácil de utilizar.
- La aplicación debe poder gestionarse de manera independiente y debe generar una respuesta automática la mayor parte del tiempo, es decir sin esperar una validación por parte de otra persona.
- La aplicación debe responder de manera rápida y eficaz.

## Reglas de negocio
### Reglas de gestión y solicitud de turnos:
- Los turnos solicitados deben solicitarse en un lugar y hora específicos.
- Los turnos se pueden cancelar hasta 24 hs antes.
- Los turnos se pueden reprogramar 48 hs antes.
- No se puede cancelar o modificar un turno después de la fecha del mismo
- No se puede solicitar un turno con fecha anterior a la actual.
- Los usuarios deben presentar el QR o token al asistir de manera presencial a un turno.
- Los turnos son intransferibles entre usuarios.

## Relación entre Clases
### Paciente
- El paciente contara con sus datos personales (dni, nombre, apellido, edad, email) y con sus respectivos estudios, turnos asignados. 
### Medico
- La clase Medico tendra dni,nombre,apellido,email. A su vez, contara con un listado semanal de turnos (al estilo agenda). La idea de contar con dni y email tiene como un sentido netamente funcional, seran usados para futuros logins, asignacion de perfil, etc.
### GestorTurnos
- El gestor de turnos se va encargar de crear, actualizar, eliminar y buscar los turnos que haya solicitado cada paciente o que se haya asignado a un medico. Permite la busqueda por paciente o medico.
### Sede
- La clase sede va a representar el lugar fisico donde se puede atender o hacerse un estudio el paciente.
### Turno
- Una de las clases mas importantes. Sera la clase que servira de vinculo entre Los medicos y los pacientes y contendra varias funcionalidades que responden a las reglas de negocio(creacion, pos).

## Conclusión

El sistema de gestión de turnos proporcionará a los usuarios una experiencia agradable al poder organizar su agenda de una manera fácil ágil e innovadora.
- La clase Medico tendra dni,nombre,apellido,email. A su vez, contara con un listado semanal de turnos (al estilo agenda). La idea de contar con dni y email tiene como un sentido netamente funcional, seran usados para futuros logins, asignacion de perfil, etc.
### GestorTurnos
- El gestor de turnos se va encargar de crear, actualizar, eliminar y buscar los turnos que haya solicitado cada paciente o que se haya asignado a un medico. Permite la busqueda por paciente o medico.
### Sede
- La clase sede va a representar el lugar fisico donde se puede atender o hacerse un estudio el paciente.
### Turno
- Una de las clases mas importantes. Sera la clase que servira de vinculo entre Los medicos y los pacientes y contendra varias funcionalidades que responden a las reglas de negocio(creacion, pos).

## Conclusión

El sistema de gestión de turnos proporcionará a los usuarios una experiencia agradable al poder organizar su agenda de una manera fácil ágil e innovadora.


## Historias de usuario

Como Usuario
Necesito acceder a la pantalla de registro
Para poder registrarme
- Crear vista de la pantalla de registro
- Crear validacion de los datos ingresados por el usuario
- Añadir diseño a la pagina

Como Médico
Necesito loguearme en la aplicación
Para poder operar en ella
- Crear vista de la pantalla de logueo
- Crear validacion de los datos ingresados

Como Usuario
Necesito solicitar turnos desde la aplicación
Para tener los turnos centralizados
- Crear vista de la solicitud de turno
- Generar un nuevo turno en base a una fecha y especialidad
- Validar que la fecha del turno sea correcta
- Generar la entrada en la base de datos del turno

Como Usuario
Necesito reprogramar mis turnos desde la aplicación
Para reprogramar fácilmente mis turnos
- Crear la vista de la reprogramacion
- Modificar el turno existente con la nueva fecha
- Validar la nueva fecha ingresada

Como Usuario
Necesito ver los turnos asignados
Para conocer y organizar mi agenda 
- Generar la vista dde los turnos asignados
- Mostrar los turnos asignados del usuario en una tabla¨
- Permitir ver la informacion del turno
- Permitir reprogramar o cancelar cada turno no vencidos


Como Médico
Necesito ver los turnos asignados
Para conocer mi agenda y atender a los pacientes
- Generar la vista de turnos asignados
- Mostrar los turnos asignados del medico en una tabla
- Permitir ver la informacion del turno
- Permitir reprogramar o cancelar cada turno no vencidos
