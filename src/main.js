import { web } from "./application/web.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

web.get("/test", () => {
  console.log("App start on port " + PORT);
});

web.listen(PORT, () => {
  console.log("App start on port " + PORT);
});
