DROP TABLE IF EXISTS Mechanics;

CREATE TABLE IF NOT EXISTS Mechanics (
	id INTEGER AUTO_INCREMENT, 
    name VARCHAR(20),
    PRIMARY KEY (id)
);

INSERT INTO Mechanics (name) VALUES ("bob");