/******************************************************************
 * SISTEMA DE PERMISOS V3
 * ---------------------------------------------------------------
 * Archivo : 05_Main.gs
 * Versión : 3.0.0
 * Estado  : DESARROLLO
 * Autor   : Daniel Huanca + ChatGPT
 *
 * RESPONSABILIDAD
 * ----------------
 * Coordinar todo el flujo del sistema.
 ******************************************************************/

/**
 * Se ejecuta automáticamente cuando Google Forms
 * registra una nueva respuesta.
 */
function alEnviarFormulario(e) {

  try {

    // 1. Leer información del formulario
    const datos = Formulario.leer(e);

    // 2. Crear la credencial
    const resultado = Slides.crear(datos);

    // 3. Enviar a Discord
    Discord.enviar(
      datos,
      resultado.imagen
    );

    // 4. Eliminar la copia temporal
    Slides.eliminar(
      resultado.id
    );

    Logger.log(
      "Permiso enviado correctamente."
    );

  } catch (error) {

    Logger.log(
      "ERROR: " + error.toString()
    );

    throw error;

  }

}