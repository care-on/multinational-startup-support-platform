CREATE TABLE users (
  uid INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(24) NOT NULL,
  email VARCHAR(128) NOT NULL,
  password VARCHAR(128) NOT NULL,
  region VARCHAR(32) NOT NULL,
  tel VARCHAR(45) NOT NULL,
  joindate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  leavedate DATETIME
);