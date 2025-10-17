import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Wave from "react-wavify";

import { FormDataAuth } from "@src/entities/forms";

import { Loader } from "@src/components/Loader/Loader";
import { SlideButtonList } from "@src/components/SlideButtonList/SlideButtonList";
import { HeaderPresentation } from "@src/components/HeaderPresentation/HeaderPresentation";
import { InputForm } from "@src/components/InputForm/InputForm";

import { useAuthStore } from "@src/hooks/useAuthStore";
import { useForm } from "@src/hooks/useForm";
import { useSlide } from "@src/hooks/useSlide";

import { theme } from "@src/styles/theme";

import assets from "@src/assets/export";

import "@src/pages/LoginPage/LoginPage.css";

const formData: FormDataAuth = {
  email: "",
  password: "",
};

export const LoginPage = (): JSX.Element => {
  const {
    images,
    isLoadingImages,
    handleLoginWithEmailAndPassword,
    handleLoginWithGoogle,
    handleGetImages,
  } = useAuthStore();

  const { index, handleSetIndex } = useSlide<string>(images);
  const { formState, onInputChange } = useForm<FormDataAuth>(formData);

  const onSubmitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const email = formState.email.trim();
    const password = formState.password.trim();

    if (!email || !password) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid email or password",
      });
    }

    handleLoginWithEmailAndPassword({
      email: formState.email,
      password: formState.password,
    });
  };

  const onSubmitWithGoogle = (): void => {
    handleLoginWithGoogle();
  };

  useEffect(() => {
    handleGetImages();
  }, []);

  return (
    <main className="main-login">
      <section className="login-wrapper">
        <article className="login-wrapper__information">
          {isLoadingImages ? (
            <Loader></Loader>
          ) : (
            <Fragment>
              <img
                src={images[index]}
                alt="loginimage"
                className="login-wrapper__img"
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

        <form className="login-wrapper__form" onSubmit={onSubmitForm}>
          <img
            src={assets.pngs.LogoPng}
            alt="logo"
            className="login-wrapper__logo"
          ></img>

          <InputForm
            type="text"
            placeholder="Your email"
            value={formState.email}
            name="email"
            className="login-wrapper__input"
            onChange={onInputChange}
          ></InputForm>

          <InputForm
            type="password"
            placeholder="Your password"
            value={formState.password}
            name="password"
            className="login-wrapper__input"
            onChange={onInputChange}
          ></InputForm>

          <button
            type="submit"
            aria-label="submit login"
            className="login-wrapper__btn"
          >
            Login
          </button>
          <button
            type="button"
            className="login-wrapper__btn"
            aria-label="login with google"
            onClick={onSubmitWithGoogle}
          >
            Google
          </button>
          <Link
            to="/auth/register"
            aria-label="Go to register page"
            className="login-wrapper__link"
          >
            Register
          </Link>
        </form>
      </section>

      <Wave
        className="login-wave"
        fill={theme.colors.secondary}
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
