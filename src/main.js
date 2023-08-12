import { web } from "./application/web.js";

const port = 3000

web.listen(port, () => {
  console.log("App start");
}); 