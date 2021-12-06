export namespace Configuracion {

  //url
  export const urlCorreo = "http://localhost:5000/correo";
  export const urlSms = "http://localhost:5000/sms";
  export const urlRespuestaJurado = "http://localhost:3000/solicitud-respuesta"
  export const urlcorreosAdministrativos = "http://localhost:3007/administradores"
  export const urlCorreosSecre = "http://localhost:3007/rols"
  export const urlCrearToken = "http://localhost:5001/crear-token";
  export const urlValidarSession = "http://localhost:5001/validar-session"

  //cambiarClave
  export const asuntoClave = "Cambio de contraseña"
  export const mensajeCambioClave = "Su contraseña ha sido actualizada correctamente, si no fue usted cambiela :v"
  export const mensajeRecuperarClave = "Su nueva contraseña es: "

  // hash
  export const hashNotificacion = "123";

  // administradores
  export const asuntoAdmin = "El jurado "
  export const infoAdmin = "ha respondido "
  export const informacionAdmin = "a la solicitud sobre "
  export const asuntoNoti = "se ha registrado una nueva respuesta"
  export const mensajeNoti = "el usuario: "
  export const mensajeNoti2 = "ha aceptado la solicitud"

  // proponente
  export const asuntoProponente = "Bienvenido a la plataforma trabajos academicos";
  export const informacionProponente = "se ha cargado exitosamente el trabajo ";
  export const fechaProponente = "en la fecha";

  // jurado
  export const asuntoJurado = "Usted ha sido invitado como evaluador al trabajo "
  export const informacionJurado = "por favor acceda al siguiente link y responda ACEPTO o RECHAZO";
  export const codigoJurado = "este es el codigo que debe ingresar para validar su respuesta: "
  export const asuntoUsuarioJurado = "Bienvenido a la plataforma trabajos academicos"
  export const mensajeUsuarioJurado = "Bienvenido! su registro en la plataforma ha sido exitoso"
  export const mensajeUsuarioJuradoOld = "Usted ha aceptado la invitacion, el material estara disponible en su perfil de usuario, si ha olvidado su contraseña puede recuperarla con el correo"
  export const mensajeUsuarioJuradoCreadoClave = "su clave es: "
  //export const urlRespuestaJurado = "http://localhost:3000/juradoxsolicitudes?filter={"where":{"id":1}}"


  // global
  export const saludo = "Hola";

  //body
  export const destinoArg = "destino";
  export const asuntoArg = "asunto";
  export const mensajeArg = "mensaje";
  export const hashArg = "hash"
  export const nombreArg = "nombre";
  export const idUserArg = "id_usuario";
  export const idRolArg = "id_rol"
  export const tokenArg = "token"







  //export const carpetaImagenVehiculo = '../../archivos/vehiculos';
  //export const nombreCampoImagenVehiculo = 'file';
  //export const extensionesPermitidasIMG: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
  export const tamMaxImagenVehiculo = 1024 * 1024;
  export const carpetaDocumentoPersona = '../../archivos/documentos';
  export const nombreCampoDocumentoPersona = 'file';
  export const extensionesPermitidasDOC: string[] = ['.PDF', '.DOC', '.DOCX', '.XLS', '.XLSX'];
  //export const rol_administrador = "615b1ecff6889450d04becb5";
  //export const rol_vendedor = "id_rol_vendedor";
  //export const url_validar_token = "http://localhost:5001/validar-token"
  //export const arg_token = "token";
  //xport const arg_rol_token = "rol";

}
