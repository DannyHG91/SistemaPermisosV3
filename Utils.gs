/******************************************************************
 * SISTEMA DE PERMISOS V3
 * ---------------------------------------------------------------
 * Archivo : Utils.gs
 * Versión : 3.0.0
 ******************************************************************/

const Utils = (() => {

  /**
   * Lee los datos enviados por Google Forms.
   */
  function leerFormulario(e) {

    const r = e.namedValues;

    return {

      acompanante: valor(r, FORM.ACOMPANANTE),

      rangoAcompanante: valor(r, FORM.RANGO_ACOMPANANTE),

      solicitante: valor(r, FORM.SOLICITANTE),

      rangoSolicitante: valor(r, FORM.RANGO_SOLICITANTE),

      motivo: valor(r, FORM.MOTIVO),

      tiempo: valor(r, FORM.TIEMPO),

      fecha: formatearFecha(

        valor(r, FORM.FECHA)

      ),

      menciones: obtenerMenciones(

        valor(r, FORM.MENCION)

      )

    };

  }

  /**
   * Obtiene un valor del formulario.
   */
  function valor(obj, campo) {

    if (!obj[campo]) return "";

    return obj[campo][0].trim();

  }

  /**
   * Convierte la fecha.
   */
  function formatearFecha(fecha) {

    if (!fecha) return "";

    return Utilities.formatDate(

      new Date(fecha),

      CONFIG.TIMEZONE,

      CONFIG.DATE_FORMAT

    );

  }

  /**
   * Convierte la selección múltiple
   * en un arreglo.
   */
  function obtenerMenciones(texto) {

    if (!texto) return [];

    return texto

      .split(",")

      .map(x => x.trim())

      .filter(Boolean);

  }

  /**
   * Genera las menciones de Discord.
   */
  function generarMencionesDiscord(lista) {

    return lista

      .map(nombre => {

        const id = DISCORD.USERS[nombre];

        return id

          ? `<@${id}>`

          : "";

      })

      .filter(Boolean)

      .join(" ");

  }

  /**
   * Genera el mapa de marcadores.
   */
  function generarMarcadores(datos) {

    return {

      [TAG.ACOMPANANTE]:
        datos.acompanante,

      [TAG.RANGO_ACOMPANANTE]:
        datos.rangoAcompanante,

      [TAG.SOLICITANTE]:
        datos.solicitante,

      [TAG.RANGO_SOLICITANTE]:
        datos.rangoSolicitante,

      [TAG.MOTIVO]:
        datos.motivo,

      [TAG.TIEMPO]:
        datos.tiempo,

      [TAG.FECHA]:
        datos.fecha,

      [TAG.MENCION1]:
        datos.menciones[0] || "",

      [TAG.MENCION2]:
        datos.menciones[1] || "",

      [TAG.MENCION3]:
        datos.menciones[2] || "",

      [TAG.MENCION4]:
        datos.menciones[3] || ""

    };

  }

  /**
   * Nombre del archivo temporal.
   */
  function generarNombreArchivo(datos) {

    const fecha = Utilities.formatDate(

      new Date(),

      CONFIG.TIMEZONE,

      "yyyyMMdd_HHmmss"

    );

    return `Permiso_${datos.solicitante}_${fecha}`;

  }

  /**
   * Valida datos obligatorios.
   */
  function validar(datos) {

    return [

      datos.acompanante,

      datos.rangoAcompanante,

      datos.solicitante,

      datos.rangoSolicitante,

      datos.motivo,

      datos.tiempo

    ].every(Boolean);

  }

  /**
   * Log informativo.
   */
  function info(msg) {

    Logger.log("[INFO] " + msg);

  }

  /**
   * Log error.
   */
  function error(err) {

    Logger.log("[ERROR] " + err);

  }

  return {

    leerFormulario,

    generarMarcadores,

    generarNombreArchivo,

    generarMencionesDiscord,

    validar,

    info,

    error

  };

})();