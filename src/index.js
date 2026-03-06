const express = require("express");
const cors = require("cors");

const matchRoutes = require("./routes/matchRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", matchRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});