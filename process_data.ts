
import XLSX from 'xlsx';
import fs from 'fs';

const filePath = './public/catalogo_autos_argentina_base_grande.xlsx';
const outputFile = './src/data/vehicleCatalogue.json';

try {
  const workbook = XLSX.readFile(filePath);
  const sheetName = 'Selector_import_web';
  const worksheet = workbook.Sheets[sheetName];
  const rawData = XLSX.utils.sheet_to_json(worksheet);

  const processed = rawData.map((row: any) => {
    let medida = row.medida_neumatico_oem || row.medida_calculada;
    
    // If we have parts but no full string, or if it's 0
    if ((!medida || medida === '0' || medida === 0) && row.ancho_mm && row.perfil && row.rodado) {
      const load = row.indice_carga ? ` ${row.indice_carga}` : '';
      const speed = row.codigo_velocidad ? row.codigo_velocidad : '';
      medida = `${row.ancho_mm}/${row.perfil} R${row.rodado}${load}${speed}`;
    }

    if (medida === 0 || medida === '0') medida = null;

    return {
      marca: row.marca,
      modelo: row.modelo_selector_preliminar,
      anio_desde: row.anio_desde_tabla,
      anio_hasta: row.anio_hasta_tabla,
      version: row.gama_version,
      carroceria: row.tipo_carroceria_dnrpa,
      medida: medida,
      estado: row.estado_medida,
      rodado: row.rodado,
      posicion: row.posicion
    };
  });

  fs.writeFileSync(outputFile, JSON.stringify(processed, null, 2));
  console.log(`Successfully exported ${processed.length} rows to ${outputFile}`);
} catch (e: any) {
  console.log('Error:', e.message);
}
