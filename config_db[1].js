constmongoose=require("mongoose");

constconnectDB=async () => {
  try {
    awaitmongoose.connect("mongodb://localhost:27017/leave-management", {});
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports=connectDB;
