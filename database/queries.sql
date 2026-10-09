
USE farmshare;

-- 1. View all registered users
SELECT * FROM users;

-- 2. View all available equipment
SELECT name, category, location, price_per_day
FROM equipment
WHERE status = 'available';

-- 3. Show equipment from lowest to highest rental price
SELECT name, price_per_day
FROM equipment
ORDER BY price_per_day ASC;

-- 4. View complete booking details
SELECT
    bookings.id AS booking_id,
    users.name AS farmer,
    equipment.name AS equipment,
    bookings.start_date,
    bookings.end_date,
    bookings.total_price,
    bookings.status
FROM bookings
JOIN users ON bookings.farmer_id = users.id
JOIN equipment ON bookings.equipment_id = equipment.id;

SELECT * FROM users;

SELECT name, category, location, price_per_day
FROM equipment
WHERE status = 'available';


SELECT
    bookings.id AS booking_id,
    users.name AS farmer,
    equipment.name AS equipment,
    bookings.start_date,
    bookings.end_date,
    bookings.total_price,
    bookings.status
FROM bookings
JOIN users
    ON bookings.farmer_id = users.id
JOIN equipment
    ON bookings.equipment_id = equipment.id;
    SELECT *
FROM equipment
WHERE status = 'available';


SELECT
    name AS equipment_name,
    price_per_day,
    3 AS rental_days,
    price_per_day * 3 AS total_rental_cost
FROM equipment;


SELECT
    bookings.id AS booking_id,
    equipment.name AS equipment_name,
    bookings.start_date,
    bookings.end_date,
    DATEDIFF(bookings.end_date, bookings.start_date) AS rental_days,
    equipment.price_per_day,
    DATEDIFF(bookings.end_date, bookings.start_date)
        * equipment.price_per_day AS calculated_cost
FROM bookings
JOIN equipment
    ON bookings.equipment_id = equipment.id;

SELECT
    equipment.id AS equipment_id,
    equipment.name AS equipment_name,
    bookings.start_date,
    bookings.end_date,
    bookings.status
FROM equipment
JOIN bookings
    ON equipment.id = bookings.equipment_id
WHERE bookings.status IN ('pending', 'confirmed');


-- Check whether equipment is already booked
-- for the requested dates


USE farmshare;

SELECT
    equipment.name AS equipment_name,
    bookings.start_date,
    bookings.end_date,
    bookings.status
FROM bookings
JOIN equipment
    ON bookings.equipment_id = equipment.id
WHERE bookings.equipment_id = 1
  AND bookings.status IN ('pending', 'confirmed')
  AND bookings.start_date < '2026-10-18'
  AND bookings.end_date > '2026-10-16';