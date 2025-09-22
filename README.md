# Challenge Ticketazo - Grupo 1

Repositorio para el proyecto grupal con Cypress del grupo 1, del curso de XAcademy QA Automation - Julio 2025.

Integrantes:
- Donalisio Agustina
- Fernandez Cecilia
- Melina Yain Medina
- Pelliza Mario
- Puricelli Jesica
- Sordián Leticia Ruth

Links
- Plan de pruebas: https://docs.google.com/spreadsheets/d/18KlZ9b6gMBgG-RNOp5CVpC_Qep5DtCT0lF1OuBW0hHc/edit?gid=0#gid=0
- ⁠Trello: https://trello.com/invite/b/68b8c17fd943ee7d2f5e1ce5/ATTI5311c1b7ab939083cacabfa8f458c74315379C3F/challenge-equipo-1


Automatizaciones

#Compra de Entradas 
- Compra de entrada gratuita - Happy path “Generar entrada Gratuita”
- Habilitacion boton compra solo con asiento 
- Seleccion de asiento no disponible 
- Confirmacion y redireccion tras generar gratuita 

#Cargar evento
- Carga de evento completa 
- Evento con multiples fechas y horarios 
- Eliminar fecha y horario

#Login 
- Login exitoso con credenciales validas 
- Login con credenciales invalidas
- Login con usuario no verificado
- Campos requeridos vacios envio
- Doble Submit 
- Navegacion a Registro y recupero 

#Registro 
- Happy path registro 
- Negative path : Envio con cambos obligatorios y marca de requerido 
- Negative path: Email formato no valido 
- Negative path: Email y confirmar email distintos 
- Negative path: Contraseña y repetir contraseña distintos 
- Negative path: Contraseña menor a 8 carabineros cteres 
- Negative path: Tel inválido 
- Negative path: DNI invalido
- Negative path: Fecha nacimiento imposible 
- Negative path: Menor a 18 
- Negative path: Provincia y localidad vacias 
- Negative path: Localidad sin provincia 

#Compra Entrada con Mercado Pago 
- LOGIN:// Iniciar sesion con credenciales de mercado pago 
- Crear evento: Login y crear evento 
- Cargar imagen evento 
- Aprobar eventos admin 
- Comprar entrada con mercado pago , redireccion a la vista de mercado pago sin pagarlo (cypress no toma el elemento de la vista de mercado pago)

#Filtro Eventos 
- Filtrado de eventos por categoría 
- Recorre todas las categorias seleccionadas 
