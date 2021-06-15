--create table
CREATE TABLE repositoryEvents (
    --create event id column
    event_id INT PRIMARY KEY,
    event_name VARCHAR(20),
    contributor VARCHAR(20)

);

DESCRIBE repositoryEvents;