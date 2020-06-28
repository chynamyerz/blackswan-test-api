import cron from "node-cron";
import express from "express";
import { User } from "./util/user";
import { Task } from "./util/task";

const createAPI = () => {
  const app = express();
  // for parsing application/json
  app.use(express.json());
  // for parsing application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  // institiate user.
  const user = new User();

  // institiate task.
  const task = new Task();

  /**
   * A create user endpoint.
   */
  app.post("/api/users", async (req, res) => {
    try {
      const { first_name, last_name, username } = req.body;

      await user.createUser({ first_name, last_name, username });

      return res.status(200).send({
        message: "New user created.",
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  });

  /**
   * An update user endpoint.
   */
  app.put("/api/users/:id", async (req, res) => {
    try {
      const { first_name, last_name, username } = req.body;
      const { id } = req.params;

      await user.updateUserById({
        first_name,
        id,
        last_name,
        username,
      });

      return res.status(200).send({
        message: "User updated.",
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  });

  /**
   * A get users endpoint.
   */
  app.get("/api/users", async (req, res) => {
    try {
      return res.status(200).send(await user.getUsers());
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  });

  /**
   * A get user information endpoint.
   */
  app.get("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      return res.status(200).send(await user.getUserById({ id }));
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  });

  /**
   * A create user task endpoint.
   */
  app.post("/api/users/:user_id/tasks", async (req, res) => {
    try {
      const {
        date_time,
        description,
        name,
        next_execute_date_time,
        status,
      } = req.body;
      const { user_id } = req.params;

      await task.createTask({
        date_time,
        description,
        name,
        next_execute_date_time,
        status: status ?? "pending",
        user_id,
      });

      return res.status(200).send({
        message: "New user task created.",
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  });

  /**
   * An update user task endpoint.
   */
  app.put("/api/users/:user_id/tasks/:task_id", async (req, res) => {
    try {
      const {
        date_time,
        description,
        name,
        next_execute_date_time,
        status,
      } = req.body;
      const { task_id, user_id } = req.params;

      await task.updateUserTaskById({
        date_time,
        description,
        name,
        next_execute_date_time,

        status,
        task_id,
        user_id,
      });

      return res.status(200).send({
        message: "User task updated.",
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  });

  /**
   * A delete user task endpoint.
   */
  app.delete("/api/users/:user_id/tasks/:task_id", async (req, res) => {
    try {
      const { task_id, user_id } = req.params;

      await task.deleteUserTaskById({ task_id, user_id });

      return res.status(200).send({
        message: "User task deleted.",
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  });

  /**
   * A get user task endpoint.
   */
  app.get("/api/users/:user_id/tasks/:task_id", async (req, res) => {
    try {
      const { task_id, user_id } = req.params;

      return res
        .status(200)
        .send(await task.getUserTaskById({ task_id, user_id }));
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  });

  /**
   * A get uset task endpoint.
   */
  app.get("/api/users/:user_id/tasks", async (req, res) => {
    try {
      const { user_id } = req.params;

      return res.status(200).send(await task.getUserTasks({ user_id }));
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  });

  /**
   * A cron job that executes every minute.
   */
  cron.schedule("* * * * *", async () => {
    try {
      await task.taskSchedule();
    } catch (error) {
      throw new Error(error.message);
    }
  });

  return app;
};

createAPI().listen({ port: process.env.PORT ?? 3000 });
