-- Create database
CREATE DATABASE IF NOT EXISTS webinar;
USE webinar;

-- Create table matching the form inputs and register.php
CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample data corresponding to your submission
INSERT INTO registrations (name, email, phone, role) 
VALUES ('John Doe', 'john@example.com', '1234567890', 'datas');