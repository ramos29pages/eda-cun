const { faker } = require('@faker-js/faker');
const pool = require('../config/conection');


async function generateData() {
    try {
        // Insertar 1000 clientes
        // for (let i = 1; i < 200; i++) {
        //     const firstName = faker.person.firstName();
        //     const lastName = faker.person.lastName();
        //     const idNumber = Math.random() * 10000000 + i;
        //     const email = faker.internet.email();
        //     const phone = faker.phone.number();
        //     const city = faker.location.city();

        //     await pool.query(
        //         'INSERT INTO Customers (FirstName, LastName, IDNumber, Email, Phone, City) VALUES ($1, $2, $3, $4, $5, $6)',
        //         [firstName, lastName, idNumber, email, phone, city]
        //     );
        // }

        // Insertar 7000 órdenes
    for (let i = 0; i < 7000; i++) {
        const orderDate =  faker.date.between({
            from: new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1),
            to: new Date()
          });
        const productID = faker.number.int({ min: 1, max: 10 }); // Use faker.number
        const customerID = faker.number.int({ min: 1, max: 199 }); // Use faker.number
        const quantity = faker.number.int({ min: 1, max: 100 }); // Use faker.number
        const price = faker.number.int({ min: 1000, max: 20000 }); // Use faker.number
  
        await pool.query(
          'INSERT INTO Orders (OrderDate, ProductID, CustomerID, Quantity, Price) VALUES ($1, $2, $3, $4, $5)',
          [orderDate, productID, customerID, quantity, price]
        );
      }

        console.log('Datos generados exitosamente.');
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
};

generateData();