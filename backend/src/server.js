const express = require("express");
const config = require("./config/config");
const bodyParser = require("body-parser");
const cors = require('cors');

const { PORT } = config;
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
     return res.send("Hello world!");
});
//* import components
app.use("/", require("./router"));

//* =============================================
app.all("*", (req, res) => {
     return res.json({
          status: 404,
          message: `Can't find ${req.originalUrl}`,
     });
});
//* Error handling
app.use((err, req, res, next) => {
     return res.status(500).json({
          status: 500,
          message: err.message,
     });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
