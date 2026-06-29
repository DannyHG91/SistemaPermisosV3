/******************************************************************
 * SISTEMA DE PERMISOS V3
 * Archivo : Slides.gs
 ******************************************************************/

const Slides = (() => {

  /**
   * Genera la credencial y devuelve el PNG.
   */
  function generar(datos) {

    let copia = null;

    try {

      copia = crearCopia(datos);

      const presentation = SlidesApp.openById(copia.getId());

      const slide = presentation.getSlides()[0];

      reemplazar(slide, Utils.generarMarcadores(datos));

      presentation.saveAndClose();

      Utilities.sleep(2000);

      return exportar(copia.getId());

    } finally {

      if (copia) {

        try {

          copia.setTrashed(true);

        } catch (e) {

          Logger.log(e);

        }

      }

    }

  }

  /**
   * Crea una copia temporal.
   */
  function crearCopia(datos) {

    const plantilla =
      DriveApp.getFileById(CONFIG.TEMPLATE_SLIDE_ID);

    const carpeta =
      DriveApp.getFolderById(CONFIG.TEMP_FOLDER_ID);

    return plantilla.makeCopy(

      Utils.generarNombreArchivo(datos),

      carpeta

    );

  }

  /**
   * Reemplaza todos los marcadores.
   */
  function reemplazar(slide, tags) {

    Object.keys(tags).forEach(tag => {

      slide.replaceAllText(

        tag,

        tags[tag]

      );

    });

  }

  /**
   * Exporta la diapositiva como PNG.
   */
  function exportar(idPresentacion) {

    const presentacion =
      SlidesApp.openById(idPresentacion);

    const slideId =
      presentacion.getSlides()[0].getObjectId();

    const url =
      "https://docs.google.com/presentation/d/" +
      idPresentacion +
      "/export/png?pageid=" +
      slideId;

    const respuesta =
      UrlFetchApp.fetch(url, {

        headers: {

          Authorization:
            "Bearer " +
            ScriptApp.getOAuthToken()

        }

      });

    return respuesta
      .getBlob()
      .setName("Permiso.png");

  }

  return {

    generar

  };

})();