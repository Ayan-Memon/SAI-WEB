import app from "./src/app.js";
import { PORT } from "./src/config/config.js";
import connectDB from "./src/config/db.js";

const port = PORT || 3000;

connectDB();

app.listen(PORT, () =>
  console.log(`Server Started Successfully on Port: ${port}`),
);
