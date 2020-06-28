# A Blackswan test api

# How to run?

With an assumption that Ubuntu version 18.04 is used and the following softwares are already installed in your host, may procceed.

[Flyway-Community]() version 6.x

[Git]() version 2.x

[Nodejs]() version 12.x

[PostgreSQL]() version 10.x

[Yarn]() version 1.x

### Clone this repository into the host and change directory to it parent directory.

```sh
git clone https://github.com/chynamyerz/blackswan-test-api.git . &&
cd blackswan-test-api
```

### Install the api dependencies.

```yarn
yarn install
```

### Create a new database and run the following bash script to create a migration as follows.

```sh
bash flyway.sh host port database_name user
```

### Create a `.env` file and add the following environment variables.

Variable | Description | Example
---- | ---- | ----
DATABASE_NAME | The database name | blackswan-test-api-db
DATABASE_HOST | The database host | http://localhost
DATABASE_PASSWORD | The database host password | password
DATABASE_USER | The host user name | username
PORT | Port on which the api should be listening | 3000

### Run the api.

```sh
yarn dev
```

# Use the api, as described from the instructions.

###  Create user
curl -i -H "Content-Type: application/json" -X POST -d '{"username":"jsmith","first_name" : "John", "last_name" : "Smith"}' http://hostname/api/users

### Update user
curl -i -H "Content-Type: application/json" -X PUT -d '{"first_name" : "John", "last_name" : "Doe"}' http://hostname/api/users/{id}

### List all users
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://hostname/api/users

### Get User info
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://hostname/api/users/{id}

### Create Task
curl -i -H "Content-Type: application/json" -X POST -d '{"name":"My task","description" : "Description of task", "date_time" : "2016-05-25 14:25:00"}' http://hostname/api/users/{user_id}/tasks

### Update Task
curl -i -H "Content-Type: application/json" -X PUT -d '{"name":"My updated task"}' http://hostname/api/users/{user_id}/tasks/{task_id}

### Delete Task
curl -i -H "Content-Type: application/json" -X DELETE http://hostname/api/users/{user_id}/tasks/{task_id}

### Get Task Info
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://hostname/api/users/{user_id}/tasks/{task_id}

### List all tasks for a user
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://hostname/api/users/{user_id}/tasks


