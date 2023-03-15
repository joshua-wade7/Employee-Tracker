INSERT INTO department (name) 
VALUES ("Finance"),
	   ("IT"),
       ("Research and Development");

INSERT INTO role (title, salary, department_id) 
VALUES ("Manager", 80000, 1),
	   ("Lead Support", 60000, 2),
	   ("Data Analyst", 50000, 3),
	   ("Supervisor", 55000, 2),
	   ("Assistant", 40000, 3),
       ("Data Security", 40000, 2),
       ("Engineer", 40000, 1);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Curtis", "Anderson", 1, 1),
	   ("Barry", "Bonds", 2, 3),
       ("Brian", "Andereson", 3, 3),
       ("Jacob", "Degrom", 4, 2),
       ("Carlos", "Delgado", 5, 1),
       ("Wander", "Franco", 6, 2),
       ("Druw", "Jones", 7, 1);