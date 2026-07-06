import app from "./src/app.js";
import { PORT } from "./src/config/config.js";
import connectDB from "./src/config/db.js";

const port = PORT || 3000;

connectDB();

app.listen(PORT, `0.0.0.0` , () =>
  console.log(`Server Started Successfully on Port: ${port}`),
);
