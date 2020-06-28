-- DATABASE SCHEMA

-- users_tasks

DROP SCHEMA IF EXISTS users_tasks CASCADE;

CREATE SCHEMA users_tasks;

SET search_path TO users_tasks;


-- MAIN TABLES


-- user

CREATE TABLE users_tasks.user (
  id         SERIAL PRIMARY KEY NOT NULL,
  username   VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name  VARCHAR(255) NOT NULL
);

CREATE UNIQUE INDEX user_username ON users_tasks.user(username);

COMMENT ON TABLE users_tasks.user IS 'A user.';

-- task

CREATE TABLE users_tasks.task (
  task_id                SERIAL PRIMARY KEY NOT NULL,
  description            VARCHAR(255) NOT NULL,
  date_time              VARCHAR(255) NOT NULL,
  next_execute_date_time VARCHAR(255),
  name                   VARCHAR(255) NOT NULL,
  status                 VARCHAR(255) NOT NULL,
  user_id                INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users_tasks.user(id)
);

COMMENT ON TABLE users_tasks.task IS 'A task for the user.';


