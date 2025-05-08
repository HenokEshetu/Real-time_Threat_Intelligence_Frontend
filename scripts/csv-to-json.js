const fs = require('fs');
const csv = require('csvtojson');

csv()
  .fromFile('./src/pages/Location/worldcities.csv')
  .then((json) => {
    fs.writeFileSync('./src/pages/Location/cities.json', JSON.stringify(json, null, 2));
    console.log('cities.json created!');
  });
