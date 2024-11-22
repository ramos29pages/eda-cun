const express = require('express');
const app = express();
const { initializeCronJobs } = require('./src/config/cron');
const { runMigrations } = require('./src/db/run-migrations');
const PORT = process.env.PORT || 3000;

runMigrations();
initializeCronJobs();

app.get('/', (req, res) => {
    res.send('Servidor de pruebas en ejecución.');

});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
