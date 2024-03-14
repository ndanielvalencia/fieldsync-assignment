import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "users",
})
export default class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "name"
  })
  name?: string;

  @Column({
    type: DataType.STRING(255),
    field: "company"
  })
  company?: string;

  @Column({
    type: DataType.STRING(255),
    field: "email"
  })
  email?: string;

  @Column({
    type: DataType.STRING(255),
    field: "phone"
  })
  phone?: string;
}
