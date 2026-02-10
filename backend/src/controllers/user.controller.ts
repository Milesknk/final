import { Request, Response } from "express";
import { db } from "../db";

export const getUsers = async (req: Request, res: Response) => {
  const conn = await db.getConnection();
  try {
    const [rows]: any = await conn.execute(`
      SELECT user_id, user_name, role_flg, deleted_flg
      FROM users
      ORDER BY user_id ASC
    `);

    const users = rows.map((user: any) => ({
      user_id: user.user_id,
      user_name: user.user_name,
      role_flg: Number(user.role_flg),
      deleted_flg: user.deleted_flg === 0 ? 0 : 1
    }));

    res.json({ data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "database error" });
  } finally {
    conn.release();
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { role_flg } = req.body;

  if (typeof role_flg !== "number") {
    return res.status(400).json({ message: "role_flg ไม่ถูกต้อง" });
  }

  let conn;
  try {
    conn = await db.getConnection();

    await conn.execute(
      `
      UPDATE users
      SET role_flg = ?
      WHERE user_id = ?
      `,
      [role_flg, user_id]
    );

    res.json({ message: "แก้ไขสิทธิ์ผู้ใช้เรียบร้อย" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "database error" });
  } finally {
    conn?.release();
  }
};

export const updateUserActive = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { active } = req.body;

  const conn = await db.getConnection();
  try {
    const [result]: any = await conn.execute(
      `
      UPDATE users
      SET deleted_flg = ?
      WHERE user_id = ?
      `,
      [active, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "ไม่พบ user_id นี้ในระบบ",
      });
    }

    res.json({ message: "แก้ไขเรียบร้อย" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "database error" });
  } finally {
    conn.release();
  }
};

export const getAvaliableUsers = async (req: Request, res: Response) => {
  const { classId } = req.params;

  const sql = `
    SELECT u.user_id, u.user_name, u.role_flg
    FROM users AS u
    WHERE u.user_id NOT IN (
      SELECT cu.user_id
      FROM class_users AS cu
      WHERE cu.class_id = ?
        AND cu.deleted_flg = 0
    )
  `;

  const [users] = await db.query(sql, [classId]);

  res.json({
    data: users,
  });
};