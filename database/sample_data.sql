USE farmshare;

INSERT INTO users (name, email, phone, role)
VALUES
('Ramesh Patel', 'ramesh@gmail.com', '9876543210', 'farmer'),
('Suresh Kumar', 'suresh@gmail.com', '9876543211', 'owner'),
('Amit Singh', 'amit@gmail.com', '9876543212', 'owner'),
('Somya Tomar', 'somyatomar145@gmail.com', '9876543210', 'farmer'),
('Shruti Mishra', 'shruti@gmail.com', '9876543211', 'owner'),
('Shivsha Singh', 'shivsha@gmail.com', '9876543212', 'owner');

INSERT INTO equipment
(owner_id, name, category, description, location, price_per_day, status)
VALUES
(2, 'Mahindra Tractor', 'Tractor',
 '45 HP tractor suitable for ploughing and farming',
 'Bhopal', 2500, 'available'),

(5, 'Swaraj Tractor', 'Tractor',
 'Reliable tractor for general farm work',
 'Bhopal', 2000, 'available');


 INSERT INTO bookings
(equipment_id, farmer_id, start_date, end_date, total_price, status)
VALUES
(1, 1, '2026-10-15', '2026-10-17', 4400, 'confirmed');