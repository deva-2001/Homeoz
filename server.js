import bodyparser from "body-parser";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import connectDB from "./db/connect.js";
import content from "./routes/content.js";
import blogs from "./routes/blogs.js";
import appointment from "./routes/appointments.js";
import payment from "./routes/payment.js";
import { Blog } from "./db/models/blogSchema.js";
import {
  getPaidAppointments,
  getRevisit,
  getPendingConsultation,
  getPendingMedication,
} from "./controllers/appointments.js";

connectDB();

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use("/contents", content);
app.use("/blogs", blogs);
app.use("/appointment", appointment);
app.use("/pay", payment);
app.get("/paidappointment", getPaidAppointments);
app.get("/pendingConsultation", getPendingConsultation);
app.get("/revisit", getRevisit);
app.get("/pendingMedication", getPendingMedication);
app.get("/", (req, res) => {
  // res.send("this is main route of api");
  console.log("U Found me");
  res.send("home");
});

app.get("/blogs", (req, res) => {
  Blog.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/test", (req, res) => {
  res.send(req.body.name);
});

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
