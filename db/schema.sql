
-- Drop the existing database if it exists
DROP DATABASE IF EXISTS business_db;

-- Create a new database
CREATE DATABASE business_db;

-- Use the newly created database
USE business_db;

-- Create a 'department' table
CREATE TABLE department (
    departmentId INT AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(30) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create a 'role' table
CREATE TABLE role (
    roleId INT AUTO_INCREMENT PRIMARY KEY,
    roleTitle VARCHAR(30) NOT NULL,
    roleSalary DECIMAL NOT NULL,
    departmentId INT NOT NULL,
    FOREIGN KEY (departmentId) REFERENCES department(departmentId),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create an 'employee' table
CREATE TABLE employee (
    employeeId INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleId INT NOT NULL,
    managerId INT,
    FOREIGN KEY (roleId) REFERENCES role(roleId),
    FOREIGN KEY (managerId) REFERENCES employee(employeeId),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);