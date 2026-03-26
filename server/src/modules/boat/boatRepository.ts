import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where?: { name: string }) {
    let query = `SELECT boat.id, boat.name, boat.coord_x, boat.coord_y, tile.type, tile.has_treasure
     FROM boat
     JOIN tile ON boat.coord_x = tile.coord_x AND boat.coord_y = tile.coord_y`;

    const params: string[] = [];

    if (where?.name) {
      query += " WHERE boat.name LIKE ?";
      params.push(`%${where.name}%`);
    }

    query += " ORDER BY boat.coord_y, boat.coord_x";

    const [rows] = await databaseClient.query<Rows>(query, params);
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE boat SET coord_x = ?, coord_y = ? WHERE id = ?",
      [boatToUpdate.coord_x, boatToUpdate.coord_y, boatToUpdate.id],
    );
    return (result as Result).affectedRows;
  }
}

export default new BoatRepository();