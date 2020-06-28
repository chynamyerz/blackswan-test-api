import { dbConnectPool } from "../db/postgresql_pool";
import moment from "moment";
import {
  IUserTaskCreateInput,
  IUserTaskArg,
  IUserTaskUpdateByIdInput,
  IUserTaskDeleteByIdInput,
  IUserTaskGetByIdInput,
} from "../interfaces/task_interfaces";

export class Task {
  /**
   * A create user task function.
   *
   * @param date_time
   * @param description
   * @param name
   * @param next_execute_date_time,
   * @param status
   * @param user_id
   *
   * Returns:
   * 		Promise<void>
   */
  public async createTask({
    date_time,
    description,
    name,
    next_execute_date_time,
    status,
    user_id,
  }: IUserTaskCreateInput): Promise<void> {
    try {
      // insert a new user task information.
      const sql = `
				INSERT INTO users_tasks.task(date_time, description, name, next_execute_date_time, status, user_id)
				VALUES ($1, $2, $3, $4, $5, $6);
			`;

      await dbConnectPool.query(sql, [
        date_time,
        description,
        name,
        next_execute_date_time,
        status,
        user_id,
      ]);
    } catch (error) {
      throw new Error("Task creation was unsucceful. Pleas try again later.");
    }
  }

  /**
   * A delete user task function.
   *
   * @param task_id
   * @param user_id
   *
   * Returns:
   * 		Promose<void>
   */
  public async deleteUserTaskById({
    task_id,
    user_id,
  }: IUserTaskDeleteByIdInput): Promise<void> {
    try {
      // select user task information query.
      const sql = `
				DELETE
				FROM users_tasks.task
				WHERE task_id=$1 AND user_id=$2;
			`;

      await dbConnectPool.query(sql, [task_id, user_id]);
    } catch (error) {
      throw new Error("Something went wrong. Pleas try again later.");
    }
  }

  /**
   * A get user task function.
   *
   * @param task_id
   * @param user_id
   *
   * Returns:
   * 		Promise<IUserTaskArg>
   */
  public async getUserTaskById({
    task_id,
    user_id,
  }: IUserTaskGetByIdInput): Promise<IUserTaskArg> {
    try {
      // select user task information query.
      const sql = `
				SELECT *
				FROM users_tasks.task
				WHERE task_id=$1 AND user_id=$2;
			`;

      const result: any = await dbConnectPool.query(sql, [task_id, user_id]);

      // check if the task exist.
      if (result.rows.length <= 0) {
        throw new Error(
          `No such user task with the task id ${task_id} for the user with user id ${user_id}`
        );
      }

      const task: any = result.rows[0];

      return {
        date_time: task.date_time,
        description: task.description,
        name: task.name,
        next_execute_date_time: task.next_execute_date_time,
        status: task.status,
        task_id: task.task_id,
        user_id: task.user_id,
      };
    } catch (error) {
      throw new Error("Something went wrong. Pleas try again later.");
    }
  }

  /**
   * A get user tasks function.
   *
   * @param user_id
   *
   * Returns:
   * 		Promise<IUserTaskArg[]>
   */
  public async getUserTasks({
    user_id,
  }: {
    user_id: number | string;
  }): Promise<IUserTaskArg[]> {
    try {
      // select all user tasks.
      const sql = `
				SELECT *
				FROM users_tasks.task
				WHERE user_id=$1
			`;

      const result: any = await dbConnectPool.query(sql, [user_id]);

      return result.rows;
    } catch (error) {
      throw new Error("Something went wrong. Please try again later.");
    }
  }

  /**
   * A get tasks function.
   *
   * Returns:
   * 		Promise<IUserTaskArg[]>
   */
  public async getUsersTasks(): Promise<IUserTaskArg[]> {
    try {
      // select all tasks.
      const sql = `
				SELECT *
				FROM users_tasks.task
			`;

      const result: any = await dbConnectPool.query(sql);

      return result.rows;
    } catch (error) {
      throw new Error("Something went wrong. Please try again later.");
    }
  }

  /**
   * An update user task function.
   *
   * @param date_time
   * @param description
   * @param name
   * @param next_execute_date_time
   * @param status
   * @param task_id
   * @param user_id
   *
   * Returns:
   * 		Promise<void>
   */
  public async updateUserTaskById({
    date_time,
    description,
    name,
    next_execute_date_time,
    status,
    task_id,
    user_id,
  }: IUserTaskUpdateByIdInput): Promise<void> {
    try {
      // get the current user task information.
      const task = await this.getUserTaskById({ task_id, user_id });

      const sql = `
				UPDATE users_tasks.task
				SET date_time=$1, description=$2, name=$3, next_execute_date_time=$4, status=$5
				WHERE task_id=$6 AND user_id=$7;
			`;

      await dbConnectPool.query(sql, [
        date_time ?? task.date_time,
        description ?? task.description,
        name ?? task.name,
        next_execute_date_time ?? next_execute_date_time,
        status ?? task.status,
        task_id,
        user_id,
      ]);
    } catch (error) {
      throw new Error("Something went wrong with the task scheduling");
    }
  }

  /**
   * A task for updating status when it is still pending but the next execute date time has passed.
   *
   * Returns:
   * 		Promise<void>
   */
  public async taskSchedule(): Promise<void> {
    try {
      const tasks = await this.getUsersTasks();
      for (let i = 1; i < tasks.length; i++) {
        // check if task is still pending but the time has passed and update status.
        if (
          tasks[i].next_execute_date_time &&
          moment(tasks[i].next_execute_date_time).isBefore(Date.now()) &&
          tasks[i].status === "pending"
        ) {
          // tslint:disable-next-line:no-console
          console.log(tasks[i]);
          await this.updateUserTaskById({
            status: "done",
            task_id: tasks[i].task_id,
            user_id: tasks[i].user_id,
          });
        }
      }
    } catch (error) {
      throw new Error("Something went wrong with the task scheduling");
    }
  }
}
