// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const authRoutes = require("./routes/authRoutes");
// const candidateRoutes = require('./routes/candidateRoutes');
// const adminRoutes = require('./routes/adminRoutes'); // ✅ Added
// const recruiterRoutes = require('./routes/recruiterRoutes');
// const clientRoutes = require('./routes/clientRoutes');
// const app = express();
// app.use(express.json());

// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));

// app.use('/uploads', express.static('uploads'));
// app.use('/api/recruiter', recruiterRoutes);
// app.use("/api/auth", authRoutes);
// app.use('/api/candidate', candidateRoutes);
// app.use('/api/admin', adminRoutes); 
// app.use('/api/client', clientRoutes);

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(process.env.PORT, () =>
//       console.log(`🚀 Server running at http://localhost:${process.env.PORT}`)
//     );
//   })
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const candidateRoutes = require('./routes/candidateRoutes');
const adminRoutes = require('./routes/adminRoutes');
const recruiterRoutes = require('./routes/recruiterRoutes');
const clientRoutes = require('./routes/clientRoutes');

const app = express();
app.use(express.json());

// ✅ Allow both local and deployed frontend in CORS
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://victorious-beach-0799c9a10.6.azurestaticapps.net"
  ],

  credentials: true
}));

// ✅ Health check route for Azure
app.get("/", (req, res) => {
  res.send("✅ SmartHire Backend is Running");
});

// Routes
app.use('/uploads', express.static('uploads'));
app.use('/api/recruiter', recruiterRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/candidate', candidateRoutes);
app.use('/api/admin', adminRoutes); 
app.use('/api/client', clientRoutes);

// ✅ Port fallback
const PORT = process.env.PORT || 5000;

// ✅ DB connection with error logging
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));
