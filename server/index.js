const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const guests = require("./routes/api/guests");
app.use("/api/guests", guests);

// Handle Production
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static(__dirname + "/public"));

  // Handle SPA (Single Page App)
  // Refer to any route at all
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

const port = process.env.PORT || 8081;

app.listen(port, () => console.log(`Server started on port : ${port}`));
