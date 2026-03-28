import express from "express";
import cors from "cors"
import errorHandler from "./middlewares/errorHandler.js";





const app = express();






/** application middleware */
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"))






/** health check */
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "DealForge API is running ✅" });
});






/** routes — uncomment as you build */
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/sessions", sessionRoutes);
// app.use("/api/leaderboard", leaderboardRoutes);





/** 404 handler */
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});
 



/** global error handler */
app.use(errorHandler);



export default app;