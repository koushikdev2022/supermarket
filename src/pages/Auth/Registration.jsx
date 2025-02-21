import { useState } from "react";
import { lockIcon, mailIcon } from "../../assets/images/images";
import { FaEyeSlash } from "../../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../reducers/AuthSlice";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const Registration = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUser(data)).then((res) => {
      if (res?.payload?.status_code === 201) {
        toast.success(res?.payload?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
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
      <form
        className="login_box bg-white shadow-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl leading-[32px] font-bold text-black pb-8">
          Create an Account
        </h1>

        {/* Full Name */}
        <div className="border border-[#e1d8d2] rounded-xl px-5 py-4 flex items-center mb-4">
          <div>
            <img src={mailIcon} alt="mailIcon" />
          </div>
          <div className="w-11/12">
            <input
              type="text"
              placeholder="Full name"
              {...register("fullname", {
                required: "Full name is required",
              })}
            />
          </div>
        </div>
        {errors.fullname && (
          <p className="text-red-500 text-sm">{errors.fullname.message}</p>
        )}

        {/* Username */}
        <div className="border border-[#e1d8d2] rounded-xl px-5 py-4 flex items-center mb-4">
          <div>
            <img src={mailIcon} alt="mailIcon" />
          </div>
          <div className="w-11/12">
            <input
              type="text"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
              })}
            />
          </div>
        </div>
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}

        {/* Email */}
        <div className="border border-[#e1d8d2] rounded-xl px-5 py-4 flex items-center mb-4">
          <div>
            <img src={mailIcon} alt="mailIcon" />
          </div>
          <div className="w-11/12">
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
            />
          </div>
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Phone Number */}
        <div className="border border-[#e1d8d2] rounded-xl px-5 py-4 flex items-center mb-4">
          <div>
            <img src={mailIcon} alt="mailIcon" />
          </div>
          <div className="w-11/12">
            <input
              type="text"
              placeholder="Phone number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
            />
          </div>
        </div>
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}

        {/* Password */}
        <div className="border border-[#e1d8d2] rounded-xl px-5 py-4 flex items-center mb-4">
          <div>
            <img src={lockIcon} alt="lockIcon" />
          </div>
          <div className="w-11/12">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
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

        {/* Date of Birth */}
        <div className="border border-[#e1d8d2] rounded-xl px-5 py-4 flex items-center mb-4">
          <div>
            <img src={mailIcon} alt="mailIcon" />
          </div>
          <div className="w-11/12">
            <input
              type="text"
              placeholder="Date of birth"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              className="appearance-none bg-white w-full border-0 border-gray-300 rounded px-3 py-2 text-gray-700"
              {...register("dob", { required: "Date of birth is required" })}
            />
          </div>
        </div>
        {errors.dob && (
          <p className="text-red-500 text-sm">{errors.dob.message}</p>
        )}

        <button
          type="submit"
          className="bg-[#f6bc56] w-full text-[#231000] hover:bg-[#231000] hover:text-[#f6bc56] text-[18px] font-bold rounded-lg py-3.5"
        >
          {loading ? "Wait..." : "Sign up"}
        </button>
        <div className="text-center pt-6">
          <p className="text-black text-sm font-medium">
            <Link
              to="/"
              className="text-sm text-[#BE7A3A] font-bold hover:text-[#231000] underline hover:no-underline mr-2"
            >
              Login
            </Link>{" "}
            Do you have an account?
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registration;
