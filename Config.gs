/******************************************************************
 * SISTEMA DE PERMISOS V3
 * ---------------------------------------------------------------
 * Archivo : Config.gs
 * Versión : 3.0.0
 * Estado  : PRODUCCIÓN
 * Autor   : Daniel Huanca + ChatGPT
 ******************************************************************/

const CONFIG = Object.freeze({

  //===========================
  // GOOGLE
  //===========================

  TEMPLATE_ID: "16Ze2GBxQHYjnD2e-35Wy7Q4E0gK1HTim1Prh6OqN_nU",

  SPREADSHEET_ID: "1wN8PCFoYJ44pII26ydec3-YnN4wNpRP_hxZEr8Bgbuc",

  // Crear una carpeta en Drive para archivos temporales
  TEMP_FOLDER_ID: "",

  TIMEZONE: "America/La_Paz",

  DATE_FORMAT: "dd/MM/yyyy",

  //===========================
  // DISCORD
  //===========================

  WEBHOOK_URL: "",

  BOT_NAME: "Sistema de Permisos",

  BOT_AVATAR: ""

});


/******************************************************************
 * GENERALES
 ******************************************************************/

const DISCORD = Object.freeze({

  USERS: {

    "Juan Saturno": "899655449694052353",

    "Miss Delgado": "1308673003684630594",

    "Sr Hans": "1450140764238778490",

    "Sr Rochy": "1443038120365920326",

    "Danny Hg": "1104579057779216414"

  }

});


/******************************************************************
 * CAMPOS DEL FORMULARIO
 ******************************************************************/

const FORM = Object.freeze({

  ACOMPANANTE: "Nombre completo ( Acompañante )",

  RANGO_ACOMPANANTE: "Rango del ( Acompañante )",

  SOLICITANTE: "Nombre completo ( Solicitante )",

  RANGO_SOLICITANTE: "Rango del ( Solicitante )",

  MOTIVO: "Motivo de permiso",

  TIEMPO: "Tiempo autorizado",

  MENCION: "Mención",

  FECHA: "Fecha"

});


/******************************************************************
 * MARCADORES GOOGLE SLIDES
 ******************************************************************/

const TAG = Object.freeze({

  ACOMPANANTE: "{{ACOMPAÑANTE}}",

  RANGO_ACOMPANANTE: "{{RANGO_ACOMPANANTE}}",

  SOLICITANTE: "{{SOLICITANTE}}",

  RANGO_SOLICITANTE: "{{RANGO_SOLICITANTE}}",

  MOTIVO: "{{MOTIVO}}",

  TIEMPO: "{{TIEMPO}}",

  FECHA: "{{FECHA}}",

  MENCION1: "{{MENCION1}}",

  MENCION2: "{{MENCION2}}",

  MENCION3: "{{MENCION3}}",

  MENCION4: "{{MENCION4}}"

});


/******************************************************************
 * MENSAJES
 ******************************************************************/

const MESSAGE = Object.freeze({

  TITLE: "📋 NUEVA SOLICITUD DE PERMISO",

  STATUS: "🟡 Pendiente de aprobación"

});