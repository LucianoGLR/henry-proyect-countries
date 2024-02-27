const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const { saveCountriesInDB } = require('./src/controllers/countriesControllers.js')

conn.sync({ force: true }).then(() => {
server.listen(PORT, () => {
  saveCountriesInDB();
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
