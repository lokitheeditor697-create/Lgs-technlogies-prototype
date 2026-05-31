const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    if (fs.statSync(file).isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
};

const files = walk('d:\\claude intern businnes\\frontend\\src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  content = content.replace(/(['"`])http:\/\/localhost:5000(.*?)(\1)/g, (match, p1, p2) => {
    return '`${process.env.NEXT_PUBLIC_API_URL || \'http://localhost:5000\'}' + p2 + '`';
  });
  
  fs.writeFileSync(file, content);
});
console.log('URLs updated perfectly!');
