-- Creación del procedimiento almacenado

CREATE OR REPLACE PROCEDURE UpdateLoyalCustomers()
AS $$
BEGIN
    -- Crear la tabla si no existe
    CREATE TABLE IF NOT EXISTS LoyalCustomers (
        CustomerID integer,
        CustomerName varchar(100),
        Products text[],
        TotalOrders integer,
        TotalSpent numeric(10, 2)
    );

    --TRUNCATE TABLE LoyalCustomers;  -- Opcional, si necesitamos limpiar la tabla
    INSERT INTO LoyalCustomers (CustomerID, CustomerName, Products, TotalOrders, TotalSpent)
    SELECT
        c.ID AS CustomerID,
        c.FirstName || ' ' || c.LastName AS CustomerName,
        ARRAY_AGG(p.Name) AS Products,
        COUNT(o.ID) AS TotalOrders,
        SUM(o.Price * o.Quantity) AS TotalSpent
    FROM
        Customers c
        JOIN Orders o ON c.ID = o.CustomerID
        JOIN Products p ON o.ProductID = p.ID
    WHERE
        o.OrderDate >= CURRENT_DATE - INTERVAL '6 months'
    GROUP BY
        c.ID
    HAVING
        COUNT(o.ID) > 10 AND SUM(o.Price * o.Quantity) > 500000;
END;
$$ LANGUAGE plpgsql;
