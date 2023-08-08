import dotenv from "dotenv";
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API,
  server: "us8",
});

const mailchimpListId = process.env.MAILCHIMP_LIST_ID;

export const subscribeUser = async (user) => {
  const subscribingUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  try {
    const response = await mailchimp.lists.addListMember(mailchimpListId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });
    const { status } = response;
    if (status === "subscribed") {
      return true;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
    process.exit(1);
  }
};
