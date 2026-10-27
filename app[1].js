constexpress=require("express");
constbodyParser=require("body-parser");
constpath=require("path"); // Add this to use 'path' module
constconnectDB=require("./config/db");
constleaveRoutes=require("./routes/leaveRoutes");

constapp=express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api", leaveRoutes);

// Start the server
constPORT=process.env.PORT||5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
