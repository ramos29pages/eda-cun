const cron = require('node-cron');
const pool = require('./conection');

// Tarea CRON para ejecutar el procedimiento almacenado
function initializeCronJobs() {
    console.log('Initializing cron jobs ...');

    cron.schedule('0 0 * * 0', async () => {
        try {
            console.log(
                new Date().toLocaleString('es-ES', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }),
                '[INFO]: Ejecutando procedimiento almacenado...'
            );
            await pool.query('CALL UpdateLoyalCustomers()');
            console.log( new Date().toLocaleString('es-ES', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }),'Procedimiento almacenado ejecutado correctamente.');
        } catch (error) {
            console.error( new Date().toLocaleString('es-ES', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }),'Error al ejecutar el procedimiento almacenado:', error);
        }
    });

    console.log( new Date().toLocaleString('es-ES', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }),
    'Tarea CRON inicializada.');
}

module.exports = { initializeCronJobs };

