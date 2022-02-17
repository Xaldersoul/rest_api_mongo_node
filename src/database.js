import { connect } from "mongoose";

(async () => {
  try {
    const db = await connect("mongodb://localhost/crud-mongo");
    console.log("Server connected to", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();
