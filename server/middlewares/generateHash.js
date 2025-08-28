const bcrypt = require('bcryptjs');

async function generateHash() {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('odt123456', salt); // Replace 'odt123456' with your actual password if different
  console.log('Generated hash:', hash);
}

generateHash();