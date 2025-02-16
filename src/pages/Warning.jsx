import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Warning = () => {
  return (
    <div className="text-light bg-dark flex min-h-screen flex-col justify-center gap-5 space-y-7 p-6 leading-relaxed md:px-60">
      {/* Warning */}
      <div className="flex flex-col items-center space-y-3">
        <div className="flex items-center gap-x-4">
          <Icon icon="ion:warning-sharp" className="size-7 text-yellow-500" />
          <h1 className="text-2xl font-bold uppercase">Warning</h1>
          <Icon icon="ion:warning-sharp" className="size-7 text-yellow-500" />
        </div>

        <h2 className="text-xl font-semibold">Phishing Scam Awareness</h2>
      </div>

      {/* Message */}
      <div className="space-y-3 text-gray-400">
        <p>
          <span className="text-light font-semibold">
            You have been a victim of a phishing scam
          </span>
          , but don't worry—
          <span className="text-light font-semibold">
            this is only part of our school assignment
          </span>{" "}
          to spread awareness about online security.
        </p>

        <p>
          To protect yourself, we strongly advise you to{" "}
          <span className="text-light font-semibold">
            change your password immediately
          </span>{" "}
          to ensure your account remains secure.
        </p>

        <p>
          We sincerely apologize for any concern this may have caused. This
          activity is solely for{" "}
          <span className="text-light font-semibold">
            educational purposes{" "}
          </span>{" "}
          to help people recognize and avoid phishing attacks.
        </p>
      </div>

      {/* What is Phishing? */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold">What is Phishing?</h3>
        <p className="text-gray-400">
          Phishing is a fraudulent attempt to trick individuals into providing
          sensitive information, such as passwords, credit card details, or
          personal data, by disguising as a legitimate entity (e.g., emails,
          fake websites, or messages).
        </p>
      </div>

      {/* How to Avoid Phishing: */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold">
          How to Avoid Phishing Attacks:
        </h3>

        <ul className="space-y-3">
          <List
            title="Verify the sender "
            text="before clicking on links or opening attachments."
          />
          <List
            title="Check URLs carefully"
            text="—phishing sites often mimic real ones with slight changes."
          />
          <List
            title="Never share passwords "
            text="or personal information via email or messages."
          />
          <List
            title="Use strong and unique passwords "
            text="for each of your accounts."
          />
          <List
            title="Enable two-factor authentication (2FA) "
            text="for added security."
          />
        </ul>
      </div>

      <p className="font-semibold">
        Stay vigilant and always think before you click!
      </p>
    </div>
  );
};

const List = ({ title, text }) => {
  return (
    <li className="flex items-start gap-3 text-gray-400">
      <Icon
        icon="material-symbols:check-box"
        className="size-6 flex-shrink-0 text-green-500"
      />
      <span>
        <span className="text-light font-semibold">{title}</span>
        {text}
      </span>
    </li>
  );
};

export default Warning;
