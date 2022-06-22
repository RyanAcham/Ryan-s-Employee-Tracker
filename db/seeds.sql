INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('David', 'Brent', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Tim ', 'Canterbury', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Gareth', 'Keenan', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Dawn', 'Tinsley', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jennifer', 'Taylor-Clarke', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ricky', 'Howard', 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Chris', 'Finch', 6, null);

INSERT INTO dept (dept_name)
VALUES ('Management');
INSERT INTO dept (dept_name)
VALUES ('Sales');
INSERT INTO dept (dept_name)
VALUES ('Accounting');
INSERT INTO dept (dept_name)
VALUES ('Reception');
INSERT INTO dept (dept_name)
VALUES ('Human Resources');

INSERT INTO role (title, salary, dept_id)
VALUES ('General Manager', 100000, 1);
INSERT INTO role (title, salary, dept_id)
VALUES ('Salesman', 70000, 2);
INSERT INTO role (title, salary, dept_id)
VALUES ('Accountant', 70000, 4);
INSERT INTO role (title, salary, dept_id)
VALUES ('Receptionist', 50000, 3);
INSERT INTO role (title, salary, dept_id)
VALUES ('Human Resource Officer', 85000, 5);
INSERT INTO role (title, salary, dept_id)
VALUES ('CEO', 350000, null);