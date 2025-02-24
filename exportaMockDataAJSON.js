/**
 * @file exportaMonkDataAJSON.js
 * @description Este script es para exportar un objeto en formato JSON a un
 * archivo en donde se encuentre este script.
 * Se utiliza un paramatro para controlar si se sobreescribe o no el archivo
 * existente
 *
 * @example
 *  Ejecucion directa desde Node:
 *  node exportaMockDataAJSON.js db.json true
 *  Esto creara ( o sobre escribira ) el archivo db.json con el contenido de el
 *  objeto modkData
 */

const fs = require("node:fs");
const path = require("node:path");
const data = require("./mockData");

/**
 * Convierte un objeto en JSON y lo guarda en el la ubicacion actual.
 *
 * @function exportJson
 * @param {string} outputFile - Nombre (o ruta) del archivo de destino. Ej: 'db.json'
 * @param {Object} jsonData - Objeto con la información a guardar.
 * @param {boolean} [overwrite=false] - Indica si se sobrescribirá el archivo en caso de que ya exista.
 * @returns {void}
 */
function exportJson(outputFile, jsonData, overwrite = false) {
  const filePath = path.resolve(__dirname, outputFile);

  // Verifica si el archivo existe.
  if (fs.existsSync(filePath) && !overwrite) {
    console.error(
      `El archivo "${outputFile}" ya existe. No se sobre escribira por que overwrite esta en 'false'. Operacion abortada.`
    );
    return;
  }

  // Convierte data a string JSON con identacion de 2 espacion
  const jsonString = JSON.stringify(jsonData, null, 2);

  // Escritura asincrona en el archivo
  fs.writeFile(filePath, jsonString, (err) => {
    if (err) {
      console.error(`Error al escribir el archivo "${outputFile}":`, err);
    } else {
      console.log(`Archivo "${outputFile}" guardado correctamente.`);
    }
  });
}

/**
 * @description Bloque opcional para ejecutar el script derectamente desde la
 * terminal.
 * Captura arggumentos para definir nombre de archivo y opcion de sobre
 * escritura
 */
if (require.main === module) {
  // ejemplo de uso node exportaMockDataAJSON.js db.json true
  const [, , argOutputFile = "db.json", argOverwrite = "false"] = process.argv;
  const overwriteFlag = argOverwrite.toLowerCase() == "true";

  exportJson(argOutputFile, data, overwriteFlag);
}

// si se quiere se puede exportar la funcion para usarla desde otro modulo.
