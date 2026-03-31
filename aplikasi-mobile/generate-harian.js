const fs = require('fs');
const path = require('path');

// Read data.json
const dataPath = path.join(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const mufrodatData = data.mufrodat_maret_april_2026;

// Extract all unique mufrodat for putra and putri
// Each person has 5 mufrodat, and we want to create a daily schedule

// Get all mufrodat from all putra
const allPutraMufrodat = [];
mufrodatData.putra.forEach(person => {
  person.mufrodat.forEach(m => {
    // Check if this mufrodat already exists (by nomor)
    if (!allPutraMufrodat.find(existing => existing.nomor === m.nomor)) {
      allPutraMufrodat.push(m);
    }
  });
});

// Get all mufrodat from all putri
const allPutriMufrodat = [];
mufrodatData.putri.forEach(person => {
  person.mufrodat.forEach(m => {
    if (!allPutriMufrodat.find(existing => existing.nomor === m.nomor)) {
      allPutriMufrodat.push(m);
    }
  });
});

console.log(`Total unique Putra mufrodat: ${allPutraMufrodat.length}`);
console.log(`Total unique Putri mufrodat: ${allPutriMufrodat.length}`);

// Create daily schedule for 31 days 
// Each day will have 5 mufrodat for putra and 5 mufrodat for putri
const harian = {
  harian: {}
};

for (let day = 1; day <= 31; day++) {
  // Calculate which mufrodat to use for this day
  // Day 1: mufrodat 1-5, Day 2: mufrodat 6-10, etc.
  const startIndex = (day - 1) * 5;
  
  // For putra - cycle through the mufrodat list
  const putraMufrodat = [];
  for (let i = 0; i < 5; i++) {
    const mufrodatIndex = (startIndex + i) % allPutraMufrodat.length;
    putraMufrodat.push(allPutraMufrodat[mufrodatIndex]);
  }
  
  // For putri - cycle through the mufrodat list
  const putriMufrodat = [];
  for (let i = 0; i < 5; i++) {
    const mufrodatIndex = (startIndex + i) % allPutriMufrodat.length;
    putriMufrodat.push(allPutriMufrodat[mufrodatIndex]);
  }
  
  harian.harian[day] = {
    putra: putraMufrodat,
    putri: putriMufrodat
  };
}

// Write to harian.json
const outputPath = path.join(__dirname, 'harian.json');
fs.writeFileSync(outputPath, JSON.stringify(harian, null, 2), 'utf-8');

console.log(`\nGenerated harian.json with ${Object.keys(harian.harian).length} days`);
console.log(`Output saved to: ${outputPath}`);
