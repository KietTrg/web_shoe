import React, { useState, useCallback, useEffect } from "react";
import { InputField, Button, Loading } from "components";
import {
  apiRegister,
  apiLogin,
  apiForgotPassword,
  apiFinalRegister,
} from "apis/user";
import Swal from "sweetalert2";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import path from "ultils/path";
import { login } from "store/user/userSlice";
import { showModal } from "store/app/appSlice";
import { useDispatch } from "react-redux";
import { validate } from "ultils/helpers";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isRegiter, setIsRegiter] = useState(false);
  const [searchParams] = useSearchParams();
  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
    });
  };
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    // console.log(response);
    if (response.success) {
      Swal.fire("Congratulation, please check email", response.mes, "success");
    } else Swal.fire("Opps!", response.mes, "error");
  };

  useEffect(() => {
    resetPayload();
  }, [isRegiter]);
  // console.log(validate(payload));
  //SUMIT
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;

    const invalids = isRegiter
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);
    if (invalids === 0) {
      if (isRegiter) {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const response = await apiRegister(payload);
        dispatch(showModal({ isShowModal: false, modalChildren: null }));
        console.log(response);
        if (response.success) {
          setIsVerifiedEmail(true);
          // Swal.fire("Congratulation", response.mes, "success").then(() => {
          //   setIsRegiter(false);
          //   resetPayload();
          // });
        } else Swal.fire("Opps!", response.mes, "error");
      } else {
        const rs = await apiLogin(data);
        if (rs.success) {
          dispatch(
            login({
              isLoggedIn: true,
              token: rs.accessToken,
              useData: rs.useData,
            })
          );
          searchParams.get("redirect")
            ? navigate(searchParams.get("redirect"))
            : navigate(`/${path.HOME}`);
        } else Swal.fire("Opps!", rs.mes, "error");
      }
    }
  }, [payload, isRegiter]);

  const finalRegister = async () => {
    const response = await apiFinalRegister(token);
    if (response.success) {
      Swal.fire("Congratulation", response.mes, "success").then(() => {
        setIsRegiter(false);
        resetPayload();
      });
    } else Swal.fire("Opps!", response.mes, "error");
    setIsVerifiedEmail(false);
    setToken("");
  };

  return (
    <div className=" w-screen h-screen relative">
      {isVerifiedEmail && (
        <div className=" absolute top-0 left-0 right-0 bottom-0 bg-overlay z-50 flex flex-col justify-center items-center ">
          <div className="bg-white w-[500px] rounded-md p-8">
            <h4 className="">
              Chúng tôi đã gửi mã code cho bạn. Vui lòng kiểm tra mail và nhập
              mã vào đây:
            </h4>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="p-2 border rounded-md outline-none"
            ></input>
            <Button
              style={
                " px-4 py-2 rounded-md text-white text-semibold bg-main my-2 ml-4 w-fit"
              }
              handleOnClick={finalRegister}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
      {isForgotPassword && (
        <div className=" absolute top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50">
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Enter your email:</label>
            <input
              type="text"
              id="email"
              placeholder="Exp: email@gmail.com"
              className=" placeholder:text-sm w-[800px] pb-2 border-b outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <div className="flex items-center justify-end w-full">
              <Button
                className=" mr-2"
                name="Submit"
                handleOnClick={handleForgotPassword}
              >
                Submit
              </Button>
              <Button
                name="Back"
                handleOnClick={() => setIsForgotPassword(false)}
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      )}
      <img
        src="https://lh3.google.com/u/0/d/1rWf8iB40OPJzlRGA_EnY87LQxS8a7fZZ=w1243-h865-iv1"
        alt="bg"
        className=" w-full h-full object-cover"
      ></img>
      <div className=" absolute top-0 left-0 right-1/2 bottom-0 flex items-center justify-center">
        <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px] ">
          <h1 className="text-[40px] font-semibold text-main mb-8">
            {isRegiter ? "Regiter" : "Login"}
          </h1>
          {isRegiter && (
            <div className="flex items-center gap-2">
              <InputField
                value={payload.firstname}
                setValue={setPayload}
                nameKey="firstname"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <InputField
                value={payload.lastname}
                setValue={setPayload}
                nameKey="lastname"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
            </div>
          )}
          <InputField
            fullWidth
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          {isRegiter && (
            <InputField
              fullWidth
              value={payload.mobile}
              setValue={setPayload}
              nameKey="mobile"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          )}
          <InputField
            fullWidth
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            type="password"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          {/* <Button name={isRegiter ? "Regiter" : "Login"} /> */}
          <Button handleOnClick={handleSubmit} fw>
            {isRegiter ? "Regiter" : "Login"}
          </Button>
          <div className=" flex items-center justify-between my-2 w-full text-sm">
            {!isRegiter && (
              <span
                className="text-main hover:underline cursor-pointer"
                onClick={() => setIsForgotPassword(true)}
              >
                Forgot your account ?
              </span>
            )}
            {!isRegiter && (
              <span
                className="text-main hover:underline cursor-pointer"
                onClick={() => setIsRegiter(true)}
              >
                Create account
              </span>
            )}
            {isRegiter && (
              <span
                className="text-main hover:underline cursor-pointer w-full text-center"
                onClick={() => setIsRegiter(false)}
              >
                Go Login
              </span>
            )}
          </div>
          <Link
            className="text-main text-sm hover:underline cursor-pointer w-full text-center"
            to={`/${path.HOME}`}
          >
            Go home?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
