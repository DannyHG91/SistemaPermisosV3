/******************************************************************
 * SISTEMA DE PERMISOS V3
 * ---------------------------------------------------------------
 * Archivo : 02_Formulario.gs
 * Versión : 3.0.0
 * Estado  : DESARROLLO
 * Autor   : Daniel Huanca + ChatGPT
 *
 * RESPONSABILIDAD
 * ----------------
 * Leer y organizar los datos provenientes de Google Forms.
 ******************************************************************/

const Formulario = (() => {

  /**
   * Lee los datos enviados por Google Forms
   * @param {Object} e Evento onFormSubmit
   * @returns {Object}
   */
  function leer(e) {

    if (!e || !e.values) {
      throw new Error(
        "Este script debe ejecutarse mediante el activador de Google Forms."
      );
    }

    const columnas = e.values;

    const datos = {

      acompanante:
        obtenerTexto(columnas[1]),

      rangoAcompanante:
        obtenerTexto(columnas[2]),

      solicitante:
        obtenerTexto(columnas[3]),

      rangoSolicitante:
        obtenerTexto(columnas[4]),

      motivo:
        obtenerTexto(columnas[5]),

      tiempo:
        obtenerTexto(columnas[6]),

      fecha:
        columnas[8]
          ? columnas[8].toString().trim()
          : "",

      menciones:
        obtenerMenciones(columnas[7])

    };

    return datos;

  }

  /**
   * Convierte un valor en texto limpio
   */
  function obtenerTexto(valor) {

    if (!valor) return "";

    return valor
      .toString()
      .trim()
      .toUpperCase();

  }

  /**
   * Convierte la respuesta de casillas
   * de Google Forms en un arreglo.
   */
  function obtenerMenciones(valor) {

    if (!valor) return [];

    return valor
      .toString()
      .split(",")
      .map(nombre => nombre.trim().toUpperCase())
      .filter(nombre => nombre !== "");

  }

  /**
   * Convierte los nombres seleccionados
   * en IDs reales de Discord.
   */
  function obtenerPings(menciones) {

    return menciones
      .map(nombre => CONFIG.DISCORD_USERS[nombre])
      .filter(id => id)
      .map(id => `<@${id}>`);

  }

  /**
   * Devuelve las primeras 4 menciones
   * para imprimirlas en la credencial.
   */
  function obtenerMencionesSlides(menciones) {

    return {

      mencion1: menciones[0] || "",

      mencion2: menciones[1] || "",

      mencion3: menciones[2] || "",

      mencion4: menciones[3] || ""

    };

  }

  return {

    leer,
    obtenerPings,
    obtenerMencionesSlides

  };

})();