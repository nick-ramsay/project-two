CREATE SCHEMA Automendo;


TRUNCATE TABLE Services;
TRUNCATE TABLE MechanicCentres;
TRUNCATE TABLE MechanicCentreCredentials;
TRUNCATE TABLE MechanicCentreServices;
TRUNCATE TABLE MechanicCentreOrdinaryHours;
TRUNCATE TABLE Appointments;


DROP TABLE IF EXISTS MechanicCentreServices;
DROP TABLE IF EXISTS MechanicCentreCredentials;
DROP TABLE IF EXISTS MechanicCentreOrdinaryHours;
DROP TABLE IF EXISTS Appointments;
DROP TABLE IF EXISTS MechanicCentres;
DROP TABLE IF EXISTS Services;



CREATE TABLE IF NOT EXISTS Services (
	id INTEGER AUTO_INCREMENT,
	service_name VARCHAR(255),
	createdAt TIMESTAMP,
	updatedAt TIMESTAMP,
	PRIMARY KEY (id)
);
INSERT INTO Services (service_name, createdAt, updatedAt)
VALUES
    ("wheel alignment", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
    ("tyre replacement", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
    ("battery replacement", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
    ("servicing", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
    ("window tinting", "2019-11-03 12:00:03", "2019-11-03 12:00:00");
















CREATE TABLE IF NOT EXISTS MechanicCentres (
	id INTEGER AUTO_INCREMENT,
	centre_name VARCHAR(50),
	phone VARCHAR(50),
	email VARCHAR(50),
	address_street VARCHAR(255),
	address_city VARCHAR(50),
	address_postcode VARCHAR(50),
	address_state VARCHAR(50),
	address_country VARCHAR(50),
	latitude DECIMAL(10, 7),
	longitude DECIMAL(10, 7),
	employee_count INTEGER,
	created_date DATE,
	created_time TIME,
	createdAt TIMESTAMP,
	updatedAt TIMESTAMP,
	PRIMARY KEY (id)
);
INSERT INTO MechanicCentres 
(centre_name, phone, email, address_street, address_city, address_postcode, address_state, address_country, latitude, longitude, employee_count, created_date, created_time, createdAt, updatedAt)
VALUES 
	("rob's auto repairs", "0410100100", "rob@gmail.com", "1 A Street", "Aaa City", "2000", "NSW", "Australia", 10.1, 10.1, 3, "2019-11-03", "12:00:00", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
    ("marks's servicing", "0410200100", "mark@gmail.com", "1 B Street", "Bbb City", "2000", "NSW", "Australia", 10.1, 10.1, 3, "2019-11-03", "12:00:00", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
    ("john's custom cars", "0410300100", "john@gmail.com", "1 C Street", "Ccc City", "2000", "NSW", "Australia", 10.1, 10.1, 3, "2019-11-03", "12:00:00", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
    ("kevin's auto repairs", "0440100100", "kevin@gmail.com", "1 D Street", "Ddd City", "2000", "NSW", "Australia", 10.1, 10.1, 3, "2019-11-03", "12:00:00", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
    ("brian's auto repairs", "0410500100", "brian@gmail.com", "1 E Street", "Eee City", "2000", "NSW", "Australia", 10.1, 10.1, 3, "2019-11-03", "12:00:00", "2019-11-03 12:00:00", "2019-11-03 12:00:00");












CREATE TABLE IF NOT EXISTS MechanicCentreCredentials (
	id INTEGER AUTO_INCREMENT,
    mechanic_centre_id INTEGER,
	user_username VARCHAR(50) UNIQUE,
	user_password VARCHAR(50),
	createdAt TIMESTAMP,
	updatedAt TIMESTAMP,
	PRIMARY KEY (id),
    FOREIGN KEY (mechanic_centre_id) REFERENCES MechanicCentres(id) ON DELETE CASCADE
);
INSERT INTO MechanicCentreCredentials (mechanic_centre_id, user_username, user_password, createdAt, updatedAt)
VALUES
	(1, "rob@gmail.com", "asdf1234", "2019-11-05 12:00:00", "2019-11-05 12:00:00"),
	(2, "mark@gmail.com", "asdf1234", "2019-11-05 12:00:00", "2019-11-05 12:00:00"),
	(3, "john@gmail.com", "asdf1234", "2019-11-05 12:00:00", "2019-11-05 12:00:00"),
	(4, "kevin@gmail.com", "asdf1234", "2019-11-05 12:00:00", "2019-11-05 12:00:00"),
	(5, "brian@gmail.com", "asdf1234", "2019-11-05 12:00:00", "2019-11-05 12:00:00");














CREATE TABLE IF NOT EXISTS MechanicCentreServices (
	id INTEGER AUTO_INCREMENT,
	mechanic_centre_id INTEGER,
	service_id INTEGER,
	available BOOLEAN,
	createdAt TIMESTAMP,
	updatedAt TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (mechanic_centre_id) REFERENCES MechanicCentres(id) ON DELETE CASCADE,
	FOREIGN KEY (service_id) REFERENCES Services(id) ON DELETE CASCADE 
);
INSERT INTO MechanicCentreServices (mechanic_centre_id, service_id, createdAt, updatedAt)
VALUES
	(1, 1, "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
    (1, 2, "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
	(1, 3, "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
    (2, 1, "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
	(2, 4, "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
    (3, 1, "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
	(3, 3, "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
    (3, 5, "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
	(4, 1, "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
    (4, 2, "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
	(5, 1, "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
	(5, 3, "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
    (5, 4, "2019-11-03 12:00:00", "2019-11-03 12:00:00");
    
    
    
    
    
    
    
    
    

CREATE TABLE IF NOT EXISTS MechanicCentreOrdinaryHours (
	id INTEGER AUTO_INCREMENT,
	mechanic_centre_id INTEGER,
	mon_start TIME,
	mon_end TIME,
	tue_start TIME,
	tue_end TIME,
	wed_start TIME,
	wed_end TIME,
	thu_start TIME,
	thu_end TIME,
	fri_start TIME,
	fri_end TIME,
	sat_start TIME,
	sat_end TIME,
	sun_start TIME,
	sun_end TIME,
	createdAt TIMESTAMP,
	updatedAt TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (mechanic_centre_id) REFERENCES MechanicCentres(id) ON DELETE CASCADE
);
INSERT INTO MechanicCentreOrdinaryHours (mechanic_centre_id, mon_start, mon_end, tue_start, tue_end, wed_start, wed_end, thu_start, thu_end, fri_start, fri_end, sat_start, sat_end, sun_start, sun_end, createdAt, updatedAt)
VALUES 
	(1, "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "00:00:00", "00:00:00", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
	(2, "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "00:00:00", "00:00:00", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
	(3, "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "00:00:00", "00:00:00", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
	(4, "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "00:00:00", "00:00:00", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
	(5, "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "09:30:00", "18:30:00", "00:00:00", "00:00:00", "2019-11-03 12:00:00", "2019-11-03 12:00:00");






































--  OK

CREATE TABLE IF NOT EXISTS Appointments (
	id INTEGER AUTO_INCREMENT,
	mechanic_centre_id INTEGER,
	service_id INTEGER,
	appointment_date DATE,
	appointment_time TIME,
	appointment_datetime TIMESTAMP,
    phone VARCHAR(50),
	email VARCHAR(50),
	car_plate VARCHAR(50),
	car_brand VARCHAR(50),
	car_model VARCHAR(50),
	additional_notes TEXT,
	createdAt TIMESTAMP,
	updatedAt TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (mechanic_centre_id) REFERENCES MechanicCentres(id) ON DELETE CASCADE,
	FOREIGN KEY (service_id) REFERENCES Services(id) ON DELETE CASCADE
);
INSERT INTO Appointments (mechanic_centre_id, service_id, appointment_date, appointment_time, appointment_datetime, phone, email, car_plate, car_brand, car_model, additional_notes, createdAt, updatedAt)
VALUES 
(1, 1, "2019-11-03", "12:00:00", "2019-11-03 12:00:00", "0420100100", "aaa@gmail.com", "AAA111", "mazda", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(2, 1, "2019-11-03", "12:00:00", "2019-11-03 12:00:00", "0420200100", "bbb@gmail.com", "BBB111", "tesla", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(3, 1, "2019-11-03", "12:00:00", "2019-11-03 12:00:00", "0420300100", "ccc@gmail.com", "CCC111", "toyota", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(4, 1, "2019-11-03", "12:00:00", "2019-11-03 12:00:00", "0420400100", "ddd@gmail.com", "DDD111", "nissan", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(5, 1, "2019-11-03", "12:00:00", "2019-11-03 12:00:00", "0420500100", "eee@gmail.com", "EEE111", "holden", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(1, 1, "2019-11-03", "12:00:00", "2019-11-03 12:00:00", "0420600100", "fff@gmail.com", "FFF111", "mercedes", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(2, 1, "2019-11-03", "12:00:00", "2019-11-03 12:00:00", "0420700100", "ggg@gmail.com", "GGG111", "bmw", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(3, 1, "2019-11-03", "12:00:00", "2019-11-03 12:00:00", "0420800100", "hhh@gmail.com", "HHH111", "audi", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(4, 1, "2019-11-03", "12:00:00", "2019-11-03 12:00:00", "0420900100", "iii@gmail.com", "III111", "mazda", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(4, 1, "2019-11-03", "12:00:00", "2019-11-03 12:00:00", "0420900100", "iii@gmail.com", "III111", "mazda", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(4, 1, "2019-11-03", "13:00:00", "2019-11-03 13:00:00", "0420900100", "iii@gmail.com", "III111", "mazda", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(4, 1, "2019-11-04", "09:00:00", "2019-11-04 09:00:00", "0420900100", "iii@gmail.com", "III111", "mazda", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(4, 1, "2019-11-04", "09:00:00", "2019-11-04 09:00:00", "0420900100", "iii@gmail.com", "III111", "mazda", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(4, 1, "2019-11-04", "09:00:00", "2019-11-04 09:00:00", "0420900100", "iii@gmail.com", "III111", "mazda", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(4, 1, "2019-11-05", "12:30:00", "2019-11-05 12:30:00", "0420900100", "iii@gmail.com", "III111", "mazda", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(4, 1, "2019-11-05", "12:30:00", "2019-11-05 12:30:00", "0420900100", "iii@gmail.com", "III111", "mazda", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(4, 1, "2019-11-05", "12:00:00", "2019-11-05 12:00:00", "0420900100", "iii@gmail.com", "III111", "mazda", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(5, 1, "2019-11-28", "09:30:00", "2019-11-28 09:30:00", "0420900100", "iii@gmail.com", "III111", "mazda", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(5, 1, "2019-11-28", "12:30:00", "2019-11-28 12:30:00", "0420900100", "iii@gmail.com", "III111", "mazda", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(5, 1, "2019-11-28", "13:30:00", "2019-11-28 13:30:00", "0420900100", "iii@gmail.com", "III111", "mazda", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(5, 1, "2019-11-29", "09:30:00", "2019-11-29 09:30:00", "0420900100", "iii@gmail.com", "III111", "mazda", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(5, 1, "2019-11-29", "12:30:00", "2019-11-29 12:30:00", "0420900100", "iii@gmail.com", "III111", "mazda", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(5, 1, "2019-11-30", "12:30:00", "2019-11-30 12:30:00", "0420900100", "iii@gmail.com", "III111", "mazda", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(5, 1, "2019-11-30", "12:30:00", "2019-11-30 12:30:00", "0420900100", "iii@gmail.com", "III111", "mazda", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00"),
(5, 2, "2019-11-30", "12:00:00", "2019-11-30 12:00:00", "0420900100", "iii@gmail.com", "III111", "mazda", "model 1", "please fix quickly", "2019-11-03 12:00:00", "2019-11-03 12:00:00");
