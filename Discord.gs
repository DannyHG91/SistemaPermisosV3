/******************************************************************
 * SISTEMA DE PERMISOS V3
 * Archivo : Discord.gs
 ******************************************************************/

const Discord = (() => {

  /**
   * Envía la credencial a Discord.
   * @param {Object} datos
   * @param {Blob} imagen
   */
  function enviar(datos, imagen) {

    const payload = {

      username: CONFIG.BOT_NAME,

      avatar_url: CONFIG.BOT_AVATAR,

      content: construirMensaje(datos)

    };

    const opciones = {

      method: "post",

      payload: {

        payload_json: JSON.stringify(payload),

        file: imagen

      },

      muteHttpExceptions: true

    };

    const respuesta = UrlFetchApp.fetch(
      CONFIG.WEBHOOK_URL,
      opciones
    );

    if (respuesta.getResponseCode() >= 300) {

      throw new Error(
        "Discord respondió: " +
        respuesta.getContentText()
      );

    }

  }

  /**
   * Construye el mensaje.
   */
  function construirMensaje(datos) {

    const menciones =
      Utils.generarMencionesDiscord(
        datos.menciones
      );

    return [

      MENSAJES.TITULO,

      "",

      MENSAJES.ESTADO,

      "",

      "**Solicitante:** " +
      datos.solicitante,

      "**Rango:** " +
      datos.rangoSolicitante,

      "",

      menciones

    ].join("\n");

  }

  return {

    enviar

  };

})();