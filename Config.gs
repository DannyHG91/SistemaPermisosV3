// ====== CONFIGURACIÓN GENERAL ======
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1520908688229924894/l7XI422PDnygCi_g3grFajTvlUjeQtvIH9WsfyijHme1YIIOTDFqWJ9IewycoWkScnQj"; // Tu webhook
const TEMPLATE_SLIDE_ID = "16Ze2GBxQHYjnD2e-35Wy7Q4E0gK1HTim1Prh6OqN_nU";

// Diccionario para convertir nombres en etiquetas de Discord
const DISCORD_USERS = {
  "JUAN SATURNO": "899655449694052353",
  "MISS DELGADO": "1308673003684630594",
  "SR HANS": "1450140764238778490",
  "SR ROCHY": "1443038120365920326",
  "DANNY HG": "1104579057779216414"
};

function alEnviarFormulario(e) {
  if (!e || !e.values) {
    console.error("Este script debe ejecutarse mediante un activador de Google Forms.");
    return;
  }

  const columnas = e.values; 
  
  // Asignación de columnas (Ajusta si el orden cambia)
  const acompanante      = columnas[1] ? columnas[1].toString().trim().toUpperCase() : "";
  const rangoAcompanante = columnas[2] ? columnas[2].toString().trim().toUpperCase() : "";
  const solicitante      = columnas[3] ? columnas[3].toString().trim().toUpperCase() : "";
  const rangoSolicitante = columnas[4] ? columnas[4].toString().trim().toUpperCase() : "";
  const motivo           = columnas[5] ? columnas[5].toString().trim().toUpperCase() : "";
  const tiempo           = columnas[6] ? columnas[6].toString().trim().toUpperCase() : "";
  
  // Procesar las menciones del formulario
  const mencionesString  = columnas[7] ? columnas[7].toString().trim().toUpperCase() : "";
  const mencionesArray   = mencionesString.split(",").map(m => m.trim());
  
  // Nombres para imprimir en la imagen del permiso
  const mencion1 = mencionesArray[0] || "";
  const mencion2 = mencionesArray[1] || "";
  const mencion3 = mencionesArray[2] || "";
  const mencion4 = mencionesArray[3] || "";

  const fecha = columnas[8] ? columnas[8].toString().trim() : "";

  // 1. Clonar la plantilla en Google Drive
  const copiaPlantilla = DriveApp.getFileById(TEMPLATE_SLIDE_ID).makeCopy("Permiso_Temporal_" + solicitante);
  const idCopia = copiaPlantilla.getId();
  const presentacion = SlidesApp.openById(idCopia);
  const diapositiva = presentacion.getSlides()[0];

  // 2. Reemplazar texto en la plantilla
  diapositiva.replaceAllText("{{SOLICITANTE}}", solicitante);
  diapositiva.replaceAllText("{{RANGO_SOLICITANTE}}", rangoSolicitante);
  diapositiva.replaceAllText("{{ACOMPAÑANTE}}", acompanante);
  diapositiva.replaceAllText("{{RANGO_ACOMPAÑANTE}}", rangoAcompanante);
  diapositiva.replaceAllText("{{MOTIVO}}", motivo);
  diapositiva.replaceAllText("{{TIEMPO}}", tiempo);
  diapositiva.replaceAllText("{{MENCION1}}", mencion1);
  diapositiva.replaceAllText("{{MENCION2}}", mencion2);
  diapositiva.replaceAllText("{{MENCION3}}", mencion3);
  diapositiva.replaceAllText("{{MENCION4}}", mencion4);
  diapositiva.replaceAllText("{{FECHA}}", fecha);
  
  presentacion.saveAndClose();

  // 3. Exportar a PNG
  const token = ScriptApp.getOAuthToken();
  const urlImagenExportada = "https://docs.google.com/presentation/d/" + idCopia + "/export/png?access_token=" + token;
  const respuestaImagen = UrlFetchApp.fetch(urlImagenExportada);
  const blobImagen = respuestaImagen.getBlob().setName("solicitud_salida.png");

  // Preparar los pings para Discord basándonos en los seleccionados
  let pingsDiscord = [];
  mencionesArray.forEach(nombre => {
    if (DISCORD_USERS[nombre]) {
      pingsDiscord.push(`<@${DISCORD_USERS[nombre]}>`);
    }
  });
  
  // Si hay menciones, creamos el texto. Si no, lo dejamos vacío.
  const textoPings = pingsDiscord.length > 0 ? `⚠️ **Atención:** ${pingsDiscord.join(" ")}` : "";

  // 4. Formatear la entrega para Discord
  const payloadData = {
    username: "Control de Personal 1S",
    content: textoPings, // <--- Aquí se envían las notificaciones reales
    payload_json: JSON.stringify({
      embeds: [{
        title: "🪖 NUEVA SOLICITUD DE SALIDA",
        color: 3092790,
        fields: [
          { name: "👤 Solicitante", value: `${rangoSolicitante} ${solicitante}`, inline: true },
          { name: "👥 Acompañante", value: `${rangoAcompanante} ${acompanante}`, inline: true },
          { name: "📝 Motivo", value: motivo, inline: false },
          { name: "⏱️ Tiempo Autorizado", value: tiempo, inline: true },
          { name: "📅 Fecha", value: fecha, inline: true }
        ],
        image: { url: "attachment://solicitud_salida.png" }
      }]
    }),
    file: blobImagen
  };

  const opciones = {
    method: "post",
    payload: payloadData,
    muteHttpExceptions: true
  };

  UrlFetchApp.fetch(DISCORD_WEBHOOK_URL, opciones);
  
  // 5. Limpieza
  DriveApp.getFileById(idCopia).setTrashed(true);
}
