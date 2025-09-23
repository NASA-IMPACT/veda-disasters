const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DATASET_CONTENT_PATH = path.join(process.cwd(), 'app', 'content', 'datasets');

function getMDXFiles(dir) {
  try {
    return fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'));
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return [];
  }
}

function readMDXFile(filePath) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return matter(rawContent);
}

console.log('Testing dataset loading from MDX files\n');
console.log('=' .repeat(60));

const mdxFiles = getMDXFiles(DATASET_CONTENT_PATH);
console.log(`Found ${mdxFiles.length} dataset MDX files:`);

mdxFiles.forEach(file => {
  const filePath = path.join(DATASET_CONTENT_PATH, file);
  const { data } = readMDXFile(filePath);
  const slug = path.basename(file, path.extname(file));

  console.log(`\n📄 ${file}`);
  console.log(`   ID: ${data.id || 'undefined'}`);
  console.log(`   Slug: ${slug}`);
  console.log(`   Name: ${data.name || 'undefined'}`);

  if (data.layers) {
    console.log(`   Layers: ${data.layers.length} defined`);
    data.layers.slice(0, 3).forEach(layer => {
      console.log(`     - ${layer.id}: ${layer.name || 'unnamed'}`);
    });
    if (data.layers.length > 3) {
      console.log(`     ... and ${data.layers.length - 3} more`);
    }
  } else {
    console.log('   Layers: none defined');
  }
});

console.log('\n' + '=' .repeat(60));

// Check specifically for hurricane-milton-2024
const miltonFile = mdxFiles.find(f => f.includes('milton'));
if (miltonFile) {
  const filePath = path.join(DATASET_CONTENT_PATH, miltonFile);
  const { data } = readMDXFile(filePath);
  console.log('\n🌀 Hurricane Milton 2024 Dataset Details:');
  console.log(`   Has layers: ${data.layers ? 'YES' : 'NO'}`);
  if (data.layers) {
    console.log(`   Number of layers: ${data.layers.length}`);
    console.log(`   Layer IDs:`);
    data.layers.forEach(layer => {
      console.log(`     - ${layer.id}`);
    });
  }
}