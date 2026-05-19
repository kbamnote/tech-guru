const fs = require('fs');
const path = './src/data/products.ts';
let content = fs.readFileSync(path, 'utf8');

// Update the interface to include originalPrice
content = content.replace(/price: number;/g, 'price: number;\n  originalPrice?: number;');

// Update all prices to 199 and originalPrice to 499
content = content.replace(/price: \d+(, \/\/ 🧪 TESTING — change back to \d+ after test)?/g, 'price: 199,\n    originalPrice: 499');

// Specifically update 'Self Help EBook All Part'
content = content.replace(
  /title: 'Self Help EBook All Part',\n\s+category: 'edu',\n\s+price: 199,\n\s+originalPrice: 499,/g,
  `title: 'Self Help EBook All Part',\n    category: 'edu',\n    price: 499,\n    originalPrice: 899,`
);

fs.writeFileSync(path, content);
console.log('Done');
