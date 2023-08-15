import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import Order from "../models/orderModel.js";

const transporter = nodemailer.createTransport({
  host: "mail.prestoltd.co.uk",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendMail = async function (reminder) {
  const { customerName, email, regNumber, serviceDate } = reminder;
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fullstack Foo 👻" <info@prestoltd.co.uk>', // sender address
    to: email, // list of receivers
    subject: `we would like to offer you discount on your next service for ${regNumber}`, // Subject line
    // text: "Hello world?", // plain text body
    html: `<p>Hello ${customerName}, You have serviced your car on ${serviceDate} in our Garage</p>
      <p>we would like to offer discount for this year's service</p>
      <b>click here to book your appointment</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

export const orderCreatedNotification = async (orderCreated) => {
  const order = await Order.findById(orderCreated._id).populate(
    "user",
    "_id name email"
  );
  const { user, totalPrice, _id } = order;
  const info = await transporter.sendMail({
    from: "<info@prestoltd.co.uk>",
    to: user.email,
    subject: `Thank you for creating an order with us`,
    html: `<h3>Hello ${user.name}</h3><p>Thanks for ordering the total is: ${totalPrice}, you can check your order page anytime here <a href="http://localhost:3000/order/${_id}">order page</a></p>`,
  });
};

export const registeredUserNotification = async (user) => {
  const { email, name } = user;
  const info = await transporter.sendMail({
    from: "<info@prestoltd.co.uk>",
    to: email,
    subject: `Thank you for registering with us`,
    html: `<h3>Hello ${name}</h3><p>Welcome aboard, you can check your profile here: <a href="http://localhost:3000/profile">profile</a></p>`,
  });
  console.log("Message sent: %s", info.messageId);
};
