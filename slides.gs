/******************************************************************
 * SISTEMA DE PERMISOS V3
 * ---------------------------------------------------------------
 * Archivo : 03_Slides.gs
 * Versión : 3.0.0
 * Estado  : DESARROLLO
 * Autor   : Daniel Huanca + ChatGPT
 *
 * RESPONSABILIDAD
 * ----------------
 * Crear la credencial desde la plantilla de Google Slides
 * y exportarla como imagen PNG.
 ******************************************************************/

const Slides = (() => {

  /**
   * Genera la credencial y devuelve la imagen PNG.
   */
  function crear(datos) {

    // Crear copia temporal
    const archivo = DriveApp
      .getFileById(CONFIG.SLIDES.TEMPLATE_ID)
      .makeCopy(
        CONFIG.SLIDES.TEMP_NAME +
        "_" +
        datos.solicitante
      );

    const presentacionId = archivo.getId();

    const presentacion =
      SlidesApp.openById(presentacionId);

    const slide =
      presentacion.getSlides()[0];

    // Obtener menciones para imprimir
    const menciones =
      Formulario.obtenerMencionesSlides(
        datos.menciones
      );

    // Reemplazar etiquetas
    slide.replaceAllText(
      CONFIG.TAGS.SOLICITANTE,
      datos.solicitante
    );

    slide.replaceAllText(
      CONFIG.TAGS.RANGO_SOLICITANTE,
      datos.rangoSolicitante
    );

    slide.replaceAllText(
      CONFIG.TAGS.ACOMPANANTE,
      datos.acompanante
    );

    slide.replaceAllText(
      CONFIG.TAGS.RANGO_ACOMPANANTE,
      datos.rangoAcompanante
    );

    slide.replaceAllText(
      CONFIG.TAGS.MOTIVO,
      datos.motivo
    );

    slide.replaceAllText(
      CONFIG.TAGS.TIEMPO,
      datos.tiempo
    );

    slide.replaceAllText(
      CONFIG.TAGS.MENCION1,
      menciones.mencion1
    );

    slide.replaceAllText(
      CONFIG.TAGS.MENCION2,
      menciones.mencion2
    );

    slide.replaceAllText(
      CONFIG.TAGS.MENCION3,
      menciones.mencion3
    );

    slide.replaceAllText(
      CONFIG.TAGS.MENCION4,
      menciones.mencion4
    );

    slide.replaceAllText(
      CONFIG.TAGS.FECHA,
      datos.fecha
    );

    presentacion.saveAndClose();

    // Exportar a PNG
    const slideId = slide.getObjectId();

    const url =
      "https://docs.google.com/presentation/d/" +
      presentacionId +
      "/export/png?id=" +
      presentacionId +
      "&pageid=" +
      slideId;

    const respuesta =
      UrlFetchApp.fetch(url, {
        headers: {
          Authorization:
            "Bearer " +
            ScriptApp.getOAuthToken()
        }
      });

    const imagen =
      respuesta
        .getBlob()
        .setName("solicitud_salida.png");

    return {

      id: presentacionId,

      imagen: imagen

    };

  }

  /**
   * Elimina la copia temporal.
   */
  function eliminar(idPresentacion) {

    DriveApp
      .getFileById(idPresentacion)
      .setTrashed(true);

  }

  return {

    crear,
    eliminar

  };

})();