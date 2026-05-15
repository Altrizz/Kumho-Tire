const fs = require("fs");
const path = require("path");

const dir = path.join(process.cwd(), "src/data/vehicleCatalogue");

if (!fs.existsSync(dir)) {
  console.error(`Directory not found: ${dir}`);
  process.exit(1);
}

const files = fs.readdirSync(dir).filter(file => file.endsWith(".json"));

let total = 0;

for (const file of files) {
  const fullPath = path.join(dir, file);
  const text = fs.readFileSync(fullPath, "utf8");

  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    console.error(`Invalid JSON in ${file}`);
    console.error(error.message);
    process.exit(1);
  }

  if (!Array.isArray(data)) {
    console.error(`${file} must contain a JSON array`);
    process.exit(1);
  }

  // Basic structure check
  data.forEach((item, index) => {
    if (!item.marca) {
       console.error(`Missing marca in ${file} at index ${index}`);
       process.exit(1);
    }
  });

  total += data.length;
}

console.log(`All vehicle catalogue JSON files are valid. Total entries: ${total}`);
