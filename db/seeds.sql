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
VALUES ("Curtis", "Anderson", 1, null), 
	   ("Barry", "Bonds", 1, null), 
       ("Brian", "Andereson", 2, null), 
       ("Jacob", "Degrom", 3, 1), 
       ("Carlos", "Delgado", 4, 2), 
       ("Wander", "Franco", 4, 3), 
       ("Druw", "Jones", 5, 3);