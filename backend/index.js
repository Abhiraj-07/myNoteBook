const express = require("express");
var cors = require('cors')

const ConnnectToMongo = require("./db");
ConnnectToMongo();

const app = express();
const port = 400;

app.use(cors())
app.use(express.json())

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`myNoteBook listening on port ${port} `);
});
