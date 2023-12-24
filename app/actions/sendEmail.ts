"use server";

import ContactFormEmail from "email/contact-form-email";
import { validateString } from "libs/utils";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  if (!validateString(senderEmail, 500))
    return {
      error: "Invalid sender email",
    };

  if (!validateString(message, 5000))
    return {
      error: "Invalid message",
    };

  try {
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "beqachokoshvili@gmail.com",
      subject: "Message from contact form",
      reply_to: senderEmail as string,
      react: React.createElement(ContactFormEmail, {
        message: message as string,
        senderEmail: senderEmail as string,
      }),
    });
  } catch (error: unknown) {
    if (!(error instanceof Error)) throw error;

    return {
      error: error.message,
    };
  }
};
