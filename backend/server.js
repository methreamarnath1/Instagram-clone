require("dotenv").config(); // invoke config to load .env variables
const app = require("./src/app");

const connectToDB = require("./src/config/database");

// ensure we handle connection errors
connectToDB()
  
app.listen(3000, () => {
  console.log("the server is running on port 3000");
});
