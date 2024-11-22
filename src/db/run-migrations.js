const fs = require('fs');
const path = require('path');
const pool = require('../config/conection');

async function executeSqlFile(filePath) {
    try {
        const sql = fs.readFileSync(filePath, 'utf8');
        await pool.query(sql);
        console.log(`Archivo SQL ejecutado: ${filePath}`);
    } catch (error) {
        console.error(`Error al ejecutar el archivo SQL (${filePath}):`, error);
    }
}

async function runMigrations() {
    try {
        console.log('Iniciando migraciones...');

        await executeSqlFile(path.join(__dirname, '../migrations/001-create-tables.sql')).then(()=>{
            console.log(new Date().toLocaleDateString(),'[INFO]: TABLAS CREADAS');
        }); 

        await executeSqlFile(path.join(__dirname, '../migrations/002-insert-manual-data.sql')).then(()=>{
            console.log(new Date().toLocaleDateString(),'[INFO]: PRODUCTOS REGISTRADOS');
        });

        await executeSqlFile(path.join(__dirname, '../migrations/003-create-update-procedure.sql')).then(()=>{
            console.log(new Date().toLocaleDateString(),'[INFO]: PROCEDURE CREADO');
        });

    } catch (error) {
        console.error('Error al ejecutar migraciones:', error);
    }

}

module.exports = { runMigrations };

