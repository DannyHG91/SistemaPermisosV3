/******************************************************************
 * SISTEMA DE PERMISOS V3
 * ---------------------------------------------------------------
 * Archivo : 01_Config.gs
 * Versión : 3.0.0
 * Estado  : DESARROLLO
 * Autor   : Daniel Huanca + ChatGPT
 *
 * RESPONSABILIDAD
 * ----------------
 * Centralizar toda la configuración del sistema.
 ******************************************************************/

const CONFIG = (() => {

  /***************************************************************
   * DISCORD
   ***************************************************************/
  const DISCORD = {

    // Webhook del canal de permisos
    WEBHOOK_URL:
      "https://discord.com/api/webhooks/1520908688229924894/l7XI422PDnygCi_g3grFajTvlUjeQtvIH9WsfyijHme1YIIOTDFqWJ9IewycoWkScnQj",

    // Nombre del bot
    USERNAME: "Control de Personal 1S",

    // Color Dorado Militar
    EMBED_COLOR: 0xD4AF37

  };

  /***************************************************************
   * GOOGLE SLIDES
   ***************************************************************/
  const SLIDES = {

    // Plantilla oficial del permiso
    TEMPLATE_ID:
      "16Ze2GBxQHYjnD2e-35Wy7Q4E0gK1HTim1Prh6OqN_nU",

    // Nombre temporal de la copia
    TEMP_NAME: "Permiso_Temporal"

  };

  /***************************************************************
   * PLACEHOLDERS DE LA PLANTILLA
   ***************************************************************/
  const TAGS = {

    SOLICITANTE: "{{SOLICITANTE}}",
    RANGO_SOLICITANTE: "{{RANGO_SOLICITANTE}}",

    ACOMPANANTE: "{{ACOMPAÑANTE}}",
    RANGO_ACOMPANANTE: "{{RANGO_ACOMPAÑANTE}}",

    MOTIVO: "{{MOTIVO}}",
    TIEMPO: "{{TIEMPO}}",

    MENCION1: "{{MENCION1}}",
    MENCION2: "{{MENCION2}}",
    MENCION3: "{{MENCION3}}",
    MENCION4: "{{MENCION4}}",

    FECHA: "{{FECHA}}"

  };

  /***************************************************************
   * USUARIOS DE DISCORD
   ***************************************************************/
  const DISCORD_USERS = {

    "JUAN SATURNO": "899655449694052353",

    "MISS DELGADO": "1308673003684630594",

    "SR HANS": "1450140764238778490",

    "SR ROCHY": "1443038120365920326",

    "DANNY HG": "1104579057779216414"

  };

  /***************************************************************
   * EXPORTAR CONFIGURACIÓN
   ***************************************************************/
  return {

    DISCORD,
    SLIDES,
    TAGS,
    DISCORD_USERS

  };

})();