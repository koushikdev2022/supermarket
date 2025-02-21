import React, { useEffect, useState } from "react";
import { lockIcon, mailIcon } from "../../assets/images/images";
import { FaEyeSlash } from "../../assets/icons";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import { login } from "../../reducers/AuthSlice";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const savedUsername = Cookies.get("username");
    const savedPassword = Cookies.get("password");

    if (savedUsername && savedPassword) {
      setValue("username", savedUsername);
      setValue("password", savedPassword);
    }
  }, [setValue]);

  const onSubmit = (data) => {
    dispatch(login(data)).then((res) => {
      console.log("Check One !!!", res);
      if (res?.payload?.status_code === 200) {
        if (data?.rememberMe) {
          Cookies.set("username", data?.username, { expires: 7 });
          Cookies.set("password", data?.password, { expires: 7 });
        } else {
          Cookies.remove("username");
          Cookies.remove("password");
        }

        toast.success(res?.payload?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/home");
        console.log("Check One !!!");
      } else {
        toast.error(
          res?.payload?.response?.data?.data?.[0]?.message ||
            res?.payload?.response?.data?.message,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          }
        );
      }
    });
  };

  return (
    <div className="login_area">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login_box shadow-xl">
          <h1 className="text-2xl leading-[32px] font-bold text-black pb-8">
            Welcome! <br /> Continue your work on the Clan platform.
          </h1>
          <div className="border border-[#e1d8d2] rounded-xl px-5 py-4 flex items-center mb-4">
            <div>
              <img src={mailIcon} alt="mailIcon" />
            </div>
            <div className="w-11/12">
              <input
                type="text"
                placeholder="username"
                {...register("username", {
                  required: "Username is required",
                })}
                className="bg-transparent w-full border-0"
              />
            </div>
          </div>
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}

          <div className="border border-[#e1d8d2] rounded-xl px-5 py-4 flex items-center mb-4">
            <div>
              <img src={lockIcon} alt="lockIcon" />
            </div>
            <div className="w-11/12">
              <input
                type={show ? "text" : "password"}
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                })}
                className="bg-transparent w-full"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="ml-2 focus:outline-none"
              >
                {show ? (
                  <FaEye className="text-[#3e2e20] text-xl" />
                ) : (
                  <FaEyeSlash className="text-[#3e2e20] text-xl" />
                )}
              </button>
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <div className="pb-4 flex justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" {...register("rememberMe")} />
              <Label htmlFor="remember" className="text-[#3f2e1f]">
                Remember me
              </Label>
            </div>
            <div>
              <Link className="text-sm text-[#BE7A3A] font-bold hover:text-[#231000]">
                Forgot your password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#f6bc56] w-full text-[#231000] hover:bg-[#231000] hover:text-[#f6bc56] text-[18px] font-bold rounded-lg py-3.5"
          >
            {isFetching ? "Wait..." : "Sign in"}
          </button>
          <div className="text-center pt-6">
            <p className="text-black text-sm font-medium">
              <Link
                to="/registration"
                className="text-sm text-[#BE7A3A] font-bold hover:text-[#231000] underline hover:no-underline mr-2"
              >
                Create Account
              </Link>
              Don't you have an account?
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
