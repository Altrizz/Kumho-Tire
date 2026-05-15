import fs from 'fs';
import path from 'path';

const inputFile = 'src/data/vehicleCatalogue.json';
const outputDir = 'src/data/vehicleCatalogue';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

try {
  console.log('Reading catalogue...');
  const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  console.log(`Processing ${data.length} entries...`);

  const brands: Record<string, any[]> = {};

  data.forEach((item: any) => {
    const brand = (item.marca || 'UNKNOWN').toLowerCase().replace(/[^a-z0-9]/g, '-');
    if (!brands[brand]) {
      brands[brand] = [];
    }
    brands[brand].push(item);
  });

  for (const [brand, entries] of Object.entries(brands)) {
    const fileName = path.join(outputDir, `${brand}.json`);
    fs.writeFileSync(fileName, JSON.stringify(entries, null, 2));
    console.log(`Created ${fileName} (${entries.length} entries)`);
  }

  console.log('Split complete.');
} catch (e: any) {
  console.error('Error splitting data:', e.message);
  process.exit(1);
}
