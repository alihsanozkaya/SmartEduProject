const nodemailer = require("nodemailer");
const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

exports.getIndexPage = async(req, res) => {
  const courses = await Course.find().sort("-createdDate").limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.countDocuments({role:"student"});
  const totalTeachers = await User.countDocuments({role:"teacher"});

  res.status(200).render("index", {
    page_name: "index",
    courses,
    totalCourses,
    totalStudents,
    totalTeachers
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
  <h1>Mail Details</h1>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h1>Message</h1>
  <p>${req.body.message}</p>
  `;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "ihsanozkaya1903@gmail.com", // gmail account
        pass: "jnfqhlefzcmbobac", // gmail password
      },
    }); // send mail with defined transport object

    const info = await transporter.sendMail({
      from: '"Smart Edu Contact Form 👻" <ihsanozkaya1903@gmail.com>', // sender address
      to: "alihsanozkaya27@gmail.com", // list of receivers
      subject: "Smart Edu Contact Form New Message", // Subject line
      html: outputMessage, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

    req.flash("success", "We Received your message successfully");

    res.status(200).redirect("/contact");
  } catch (error) {
    // req.flash("error", `Something happened! ${error}`);
    req.flash("error", `Something happened!`);
    res.status(400).redirect("/contact");
  }
};
