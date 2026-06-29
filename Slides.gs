/******************************************************************
 * SISTEMA DE PERMISOS V3
 * ---------------------------------------------------------------
 * Archivo : Slides.gs
 * Versión : 3.0.0
 ******************************************************************/

const Slides = (() => {

  /**
   * Genera la credencial.
   * @param {Object} datos
   * @returns {Blob}
   */
  function generar(datos) {

    let archivo = null;

    try {

      Utils.info("Creando copia de la plantilla...");

      archivo = crearCopia(datos);

      const presentacion = SlidesApp.openById(
        archivo.getId()
      );

      const slide = presentacion.getSlides()[0];

      const marcadores =
        Utils.generarMarcadores(datos);

      reemplazarMarcadores(
        slide,
        marcadores
      );

      presentacion.saveAndClose();

      Utilities.sleep(2000);

      return exportarPNG(
        archivo.getId()
      );

    } catch (error) {

      Utils.error(error);

      throw error;

    } finally {

      eliminarTemporal(
        archivo
      );

    }

  }

  /**
   * Crea una copia temporal.
   */
  function crearCopia(datos) {

    const plantilla = DriveApp.getFileById(
      CONFIG.TEMPLATE_ID
    );

    const carpeta = DriveApp.getFolderById(
      CONFIG.TEMP_FOLDER_ID
    );

    return plantilla.makeCopy(

      Utils.generarNombreArchivo(datos),

      carpeta

    );

  }

  /**
   * Reemplaza todos los marcadores.
   */
  function reemplazarMarcadores(

    slide,

    marcadores

  ) {

    Object.keys(marcadores)

      .forEach(tag => {

        slide.replaceAllText(

          tag,

          marcadores[tag]

        );

      });

  }
