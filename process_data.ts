
import XLSX from 'xlsx';
import fs from 'fs';

const filePath = './public/catalogo_autos_argentina_base_grande.xlsx';
const outputFile = './src/data/vehicleCatalogue.json';

// Popular vehicle measures for Argentina as fallback
const POPULAR_MEASURES: Record<string, string> = {
  "HILUX DX": "225/70 R17",
  "HILUX SR": "265/65 R17",
  "HILUX SRV": "265/60 R18",
  "HILUX SRX": "265/60 R18",
  "COROLLA XLI": "205/55 R16",
  "COROLLA XEI": "205/55 R16",
  "COROLLA SEG": "225/45 R17",
  "AMAROK TRENDLINE": "245/70 R16",
  "AMAROK COMFORTLINE": "245/65 R17",
  "AMAROK HIGHLINE": "255/60 R18",
  "GOL TREND": "175/70 R14",
  "CRONOS DRIVE": "185/60 R15",
  "CRONOS PRECISION": "195/55 R16",
  "RANGER XL": "255/70 R16",
  "RANGER XLT": "265/65 R17",
  "RANGER LIMITED": "265/60 R18",
  "PEUGEOT 208 LIKE": "185/65 R15",
  "PEUGEOT 208 ACTIVE": "185/65 R15",
  "PEUGEOT 208 ALLURE": "195/55 R16",
  "ONIX JOY": "185/70 R14",
  "ONIX LT": "185/65 R15",
  "ETIOS X": "175/65 R14",
  "ETIOS XLS": "185/60 R15",
  "RENEGADE SPORT": "215/65 R16",
  "RENEGADE LONGITUDE": "225/55 R18",
  "COMPASS SPORT": "225/60 R17",
  "COMPASS LONGITUDE": "225/55 R18"
};

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

    // Fallback to popular measures
    if (!medida || medida === '0' || medida === 0) {
      const vehicleKey = `${row.modelo_selector_preliminar} ${row.gama_version}`.toUpperCase();
      for (const [key, val] of Object.entries(POPULAR_MEASURES)) {
        if (vehicleKey.includes(key)) {
          medida = val;
          break;
        }
      }
    }

    if (medida === 0 || medida === '0') medida = null;

    return {
      marca: row.marca,
      modelo: row.modelo_selector_preliminar,
      anio_desde: row.anio_desde_tabla,
      anio_hasta: row.anio_hasta_tabla,
      version: row.gama_version,
      medida: medida,
      estado: medida ? 'Validado' : row.estado_medida,
      rodado: row.rodado,
      posicion: row.posicion
    };
  });

  fs.writeFileSync(outputFile, JSON.stringify(processed, null, 2));
  console.log(`Successfully exported ${processed.length} rows to ${outputFile}`);
  console.log(`Final file size: ${fs.statSync(outputFile).size} bytes`);
} catch (e: any) {
  console.log('Error:', e.message);
}
