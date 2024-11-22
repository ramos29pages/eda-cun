-- Crear tabla para almacenar clientes
CREATE TABLE IF NOT EXISTS Customers (
    ID SERIAL PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    IDNumber VARCHAR(20),
    Email VARCHAR(100),
    Phone VARCHAR(100),
    City VARCHAR(50)
);

-- Crear tabla para almacenar Prodcutos
CREATE TABLE IF NOT EXISTS Products (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(100),
    Price NUMERIC,
    Brand VARCHAR(50),
    SKU VARCHAR(50),
    Description TEXT
);

-- Crear tabla para almacenar ordenes
CREATE TABLE IF NOT EXISTS Orders (
    ID SERIAL PRIMARY KEY,
    OrderDate DATE,
    Price NUMERIC,
    Quantity INT,
    CustomerID INT REFERENCES Customers(ID),
    ProductID INT REFERENCES Products(ID)
);

-- Crear tabla para almacenar clientes leales
CREATE TABLE IF NOT EXISTS LoyalCustomers (
    ID SERIAL PRIMARY KEY,
    CustomerID INT,
    CustomerName VARCHAR(100),
    Products TEXT[],
    TotalOrders INT,
    TotalSpent NUMERIC
);