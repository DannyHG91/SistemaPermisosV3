/******************************************************************
 * SISTEMA DE PERMISOS V3
 * ---------------------------------------------------------------
 * Archivo : 04_Discord.gs
 * Versión : 3.0.0
 * Estado  : DESARROLLO
 * Autor   : Daniel Huanca + ChatGPT
 *
 * RESPONSABILIDAD
 * ----------------
 * Enviar la solicitud de salida al canal de Discord.
 ******************************************************************/

const Discord = (() => {

  /**
   * Envía la solicitud al webhook de Discord.
   * @param {Object} datos Datos del formulario.
   * @param {Blob} imagen Imagen PNG de la credencial.
   */
  function enviar(datos, imagen) {

    // Obtener las menciones reales
    const pings = Formulario.obtenerPings(datos.menciones);

    // Texto que aparecerá arriba del embed
    const contenido = pings.length > 0
      ? "⚠️ **Atención:** " + pings.join(" ")
      : "";

    // Construcción del embed
    const payload = {

      username: CONFIG.DISCORD.USERNAME,

      content: contenido,

      allowed_mentions: {
        parse: ["users"]
      },

      embeds: [

        {

          title: "🪖 NUEVA SOLICITUD DE SALIDA",

          color: CONFIG.DISCORD.EMBED_COLOR,

          fields: [

            {
              name: "👤 Solicitante",
              value:
                datos.rangoSolicitante +
                " " +
                datos.solicitante,
              inline: true
            },

            {
              name: "👥 Acompañante",
              value:
                datos.rangoAcompanante +
                " " +
                datos.acompanante,
              inline: true
            },

            {
              name: "📝 Motivo",
              value: datos.motivo,
              inline: false
            },

            {
              name: "⏱ Tiempo Autorizado",
              value: datos.tiempo,
              inline: true
            },

            {
              name: "📅 Fecha",
              value: datos.fecha,
              inline: true
            }

          ],

          image: {

            url: "attachment://solicitud_salida.png"

          }

        }

      ]

    };

    // Envío del webhook
    const respuesta = UrlFetchApp.fetch(
      CONFIG.DISCORD.WEBHOOK_URL,
      {

        method: "post",

        payload: {

          payload_json: JSON.stringify(payload),

          file: imagen

        },

        muteHttpExceptions: true

      }

    );

    Logger.log(respuesta.getContentText());

  }

  return {

    enviar

  };

})();