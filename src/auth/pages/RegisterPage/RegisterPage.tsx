import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Wave from "react-wavify";

import { Loader } from "@src/ui/components/Loader/Loader";
import { SlideButtonList } from "@src/ui/components/SlideButtonList/SlideButtonList";
import { HeaderPresentation } from "@src/auth/components/HeaderPresentation/HeaderPresentation";
import { InputForm } from "@src/auth/components/InputForm/InputForm";

import { useSlide } from "@src/hooks/useSlide";
import { useAuthStore } from "@src/hooks/useAuthStore";
import { useForm } from "@src/hooks/useForm";
import { rootCss } from "@src/constants/configCss";

import logo from "@src/assets/logo.png";
import "@src/auth/pages/RegisterPage/RegisterPage.css";

type FormDataRegister = {
  email: string;
  password: string;
  repeatPassword: string;
  username: string;
};

const formData: FormDataRegister = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export const RegisterPage = (): JSX.Element => {
  const {
    images,
    isLoadingImages,
    handleCreateNewUserWithEmailAndPassword,
    handleGetImages,
  } = useAuthStore();

  const { index, handleSetIndex } = useSlide<string>(images);
  const { formState, onInputChange } = useForm<FormDataRegister>(formData);

  const onSubmitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const email = formState.email.trim();
    const password = formState.password.trim();
    const repeatPassword = formState.repeatPassword.trim();
    const username = formState.username.trim();

    if (!email || !password || !repeatPassword || !username) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to complete all the fields",
      });
    }

    if (password !== repeatPassword) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords must be identical to each other",
      });
    }

    handleCreateNewUserWithEmailAndPassword(formState);
  };

  useEffect(() => {
    handleGetImages();
  }, []);

  return (
    <main className="register-page">
      <section className="register-wrapper">
        <article className="register-wrapper__information">
          {isLoadingImages ? (
            <Loader></Loader>
          ) : (
            <Fragment>
              <img
                src={images[index]}
                alt="registerimage"
                className="register-wrapper__img"
              ></img>

              <HeaderPresentation>
                {index === 0
                  ? "The best free games wiki"
                  : index === 1
                  ? "Share with your friends"
                  : "Stay up to date with the latest news"}
              </HeaderPresentation>

              <SlideButtonList
                index={index}
                handleSetIndex={handleSetIndex}
              ></SlideButtonList>
            </Fragment>
          )}
        </article>

        <form className="register-wrapper__form" onSubmit={onSubmitForm}>
          <img src={logo} alt="logo" className="register-wrapper__logo"></img>

          <InputForm
            type="text"
            placeholder="Your username"
            value={formState.username}
            name="username"
            className="register-wrapper__input"
            onChange={onInputChange}
          ></InputForm>

          <InputForm
            type="email"
            placeholder="Your email"
            value={formState.email}
            name="email"
            className="register-wrapper__input"
            onChange={onInputChange}
          ></InputForm>

          <InputForm
            type="password"
            placeholder="Your password"
            value={formState.password}
            name="password"
            className="register-wrapper__input"
            onChange={onInputChange}
          ></InputForm>

          <InputForm
            type="password"
            placeholder="Repeat your password"
            value={formState.repeatPassword}
            name="repeatPassword"
            className="register-wrapper__input"
            onChange={onInputChange}
          ></InputForm>

          <button
            type="submit"
            aria-label="submit register"
            className="register-wrapper__btn"
          >
            Register
          </button>
          <Link
            to="/auth/login"
            aria-label="Go to login page"
            className="register-wrapper__link"
          >
            Go to Login
          </Link>
        </form>
      </section>

      <Wave
        className="register-wave"
        fill={rootCss.colors.secondary}
        paused={false}
        options={{
          amplitude: 40,
          speed: 0.15,
          points: 3,
        }}
      />
    </main>
  );
};
