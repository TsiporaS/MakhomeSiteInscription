const express = require("express");
const cors = require("cors");
const student = require("./student");
const manager = require("./manager");
const accept = require("./accept");


const app = express();

app.use(cors());
app.use(express.json());

app.use(student);
app.use(manager);
app.use(accept);

const PORT = process.env.PORT || 5000; // Change to a different port like 5001

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);

});
