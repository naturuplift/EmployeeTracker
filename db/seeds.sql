
-- Insert departments
INSERT INTO department (departmentId, departmentName) VALUES 
(1, 'Research & Development'),
(2, 'Sales'),
(3, 'Marketing'),
(4, 'Human Resources');

-- Insert roles including salaries and department IDs
INSERT INTO role (roleId, roleTitle, roleSalary, departmentId) VALUES 
(1, 'Chief Technology Officer', 200000, 1), -- Assuming CTO as admin
(2, 'Data Scientist', 150000, 1),
(3, 'AI Researcher', 140000, 1),
(4, 'Product Manager', 130000, 1),
(5, 'Sales Lead', 120000, 2),
(6, 'Sales Representative', 90000, 2),
(7, 'Marketing Director', 110000, 3),
(8, 'Marketing Specialist', 80000, 3),
(9, 'HR Manager', 100000, 4),
(10, 'HR Associate', 70000, 4);

-- Insert employees
INSERT INTO employee (employeeId, firstName, lastName, roleId, managerId) VALUES 
(1, 'Becky', 'Blast', 5, 1),
(2, 'Charlie', 'Chance', 7, 1),
(3, 'Diana', 'Duke', 9, 1),
(4, 'Evan', 'Echo', 4, 1),
(5, 'Fiona', 'Frost', 2, 1),
(6, 'George', 'Glow', 2, 1),
(7, 'Hannah', 'Haze', 3, 1),
(8, 'Ian', 'Ivy', 3, 1),
(9, 'Jasmine', 'Jolt', 4, 4),
(10, 'Kyle', 'Knight', 6, 5),
(11, 'Liam', 'Light', 6, 5),
(12, 'Mia', 'Mist', 6, 5),
(13, 'Noah', 'Noble', 6, 5),
(14, 'Olivia', 'Oak', 6, 5),
(15, 'Peyton', 'Pike', 8, 7),
(16, 'Quinn', 'Quartz', 8, 7),
(17, 'Ryan', 'Rift', 8, 7),
(18, 'Sophia', 'Sage', 8, 7),
(19, 'Tyler', 'Torch', 8, 7),
(20, 'Uma', 'Urchin', 10, 9),
(21, 'Victor', 'Vale', 10, 9),
(22, 'Wendy', 'Wisp', 10, 9),
(23, 'Xander', 'Xenon', 10, 9),
(24, 'Yara', 'Yield', 10, 9),
(25, 'Zane', 'Zenith', 10, 9);