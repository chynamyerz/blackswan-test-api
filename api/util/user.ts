import { dbConnectPool } from "../db/postgresql_pool";
import {
  IUserCreateInput,
  IUserArg,
  IUserUpdateByIdInput,
  IUserGetByIdInput,
} from "../interfaces/user_interfaces";

export class User {
  /**
   * A create user function.
   *
   * @param first_name
   * @param last_name
   * @param username
   *
   * Returns:
   * 		Promise<void>
   */
  public async createUser({
    first_name,
    last_name,
    username,
  }: IUserCreateInput): Promise<void> {
    try {
      // check if username already exist.
      let sql = `
				SELECT username
				FROM users_tasks."user"
				WHERE username=$1;
			`;

      const result: any = await dbConnectPool.query(sql, [username]);

      if (result.rows.length) {
        throw new Error(`A user with the username ${username} already exists.`);
      }

      // insert new user information.
      sql = `
				INSERT INTO users_tasks."user"(username, first_name, last_name)
				VALUES ($1, $2, $3);
			`;

      await dbConnectPool.query(sql, [username, first_name, last_name]);
    } catch (error) {
      throw new Error("User creation was unsucceful. Pleas try again later.");
    }
  }

  /**
   * A get user by id function.
   *
   * @param id
   *
   * Returns:
   * 		Promise<IUserArg>
   */
  public async getUserById({ id }: IUserGetByIdInput): Promise<IUserArg> {
    try {
      // check if user exist.
      const sql = `
				SELECT *
				FROM users_tasks."user"
				WHERE id=$1;
			`;

      const result: any = await dbConnectPool.query(sql, [id]);

      if (result.rows.length <= 0) {
        throw new Error(`No such user with the id ${id}`);
      }

      const user: any = result.rows[0];

      return {
        first_name: user.first_name,
        id: user.id,
        last_name: user.last_name,
        username: user.username,
      };
    } catch (error) {
      throw new Error("Something went wrong. Pleas try again later.");
    }
  }

  /**
   * A get users function.
   *
   * Returns:
   * 		Promise<IUserArg[]>
   */
  public async getUsers(): Promise<IUserArg[]> {
    try {
      // select all users.
      const sql = `
				SELECT *
				FROM users_tasks.user
			`;

      const result: any = await dbConnectPool.query(sql);

      return result.rows;
    } catch (error) {
      throw new Error("Something went wrong. Please try again later.");
    }
  }

  /**
   * An update user function.
   *
   * @param id
   * @param first_name
   * @param last_name
   * @param username
   *
   * Returns:
   * 		Promise<void>
   */
  public async updateUserById({
    id,
    first_name,
    last_name,
    username,
  }: IUserUpdateByIdInput): Promise<void> {
    try {
      const user = await this.getUserById({ id });

      const sql = `
				UPDATE users_tasks.user
				SET username=$1, first_name=$2, last_name=$3
				WHERE id=$4;
			`;

      await dbConnectPool.query(sql, [
        username ?? user.username,
        first_name ?? user.first_name,
        last_name ?? user.last_name,
        id,
      ]);
    } catch (error) {
      throw new Error("Something went wrong. Please try again later.");
    }
  }
}
