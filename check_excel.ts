
import XLSX from 'xlsx';
import fs from 'fs';

const filePath = './public/catalogo_autos_argentina_base_grande.xlsx';

try {
  if (!fs.existsSync(filePath)) {
    console.log('File does not exist');
  } else {
    const stats = fs.statSync(filePath);
    console.log('File size:', stats.size);
    if (stats.size > 0) {
      const workbook = XLSX.readFile(filePath);
      console.log('Sheets:', workbook.SheetNames);
      const sheetName = workbook.SheetNames.includes('Selector_import_web') ? 'Selector_import_web' : workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      // Use header: 1 to get raw rows including nulls/undefined for columns
      const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const headers = rawData[0] as string[];
      console.log('Raw Headers:', JSON.stringify(headers));
      
      // Find index of interesting columns
      const colIdx = (name: string) => headers.indexOf(name);
      console.log('ancho_mm index:', colIdx('ancho_mm'));
      console.log('perfil index:', colIdx('perfil'));
      console.log('rodado index:', colIdx('rodado'));
      console.log('medida_calculada index:', colIdx('medida_calculada'));
      console.log('medida_neumatico_oem index:', colIdx('medida_neumatico_oem'));
    } else {
      console.log('File is empty');
    }
  }
} catch (e: any) {
  console.log('Error:', e.message);
}
