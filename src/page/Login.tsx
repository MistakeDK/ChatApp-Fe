import { IMAGES } from "@/config/constant";
import { loginApi } from "@/services/auth/auth";
import { IBodyLogin } from "@/services/auth/auth.interface";
import { useAuthStore } from "@/store/auth.store";
import { log } from "@/util/logger";
import { Button, Form, Image, Input } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const Login = () => {
  const { login } = useAuthStore();
  const loginBodySchema: yup.ObjectSchema<IBodyLogin> = yup.object({
    gmail: yup
      .string()
      .email("email is not valid")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  const mutationLogin = useMutation({
    mutationFn: (body: IBodyLogin) => {
      return loginApi({
        body,
        notifyConfig: {
          success: "Login success",
          error: "Login error",
        },
      });
    },
    onSuccess: (response) => {
      const { message } = response;
      log("response", response);
      login(message.accessToken, message.refreshToken, message.id);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBodyLogin>({
    mode: "onChange",
    resolver: yupResolver(loginBodySchema),
  });

  const onSubmit = (values: IBodyLogin) => {
    mutationLogin.mutate(values);
  };

  return (
    <React.Fragment>
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex w-2/5 h-3/5  space-x-4 p-2">
          {/* Login card */}
          <div className="w-1/2 flex h-full items-center justify-center">
            <div className="flex flex-col w-full space-y-4">
              <span className="w-full text-2xl">WelCome Back! My friends</span>
              <Form validationBehavior="aria" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col w-full space-y-2">
                  <Input
                    label="Gmail"
                    errorMessage={errors.gmail?.message}
                    isInvalid={Boolean(errors.gmail?.message)}
                    isRequired
                    {...register("gmail")}
                  ></Input>
                  <Input
                    label="Password"
                    type="Password"
                    errorMessage={errors.password?.message}
                    isInvalid={Boolean(errors.password?.message)}
                    isRequired
                    {...register("password")}
                  ></Input>
                  <Button type="submit" className="m-auto">
                    Login
                  </Button>
                </div>
              </Form>
            </div>
          </div>
          {/* Image Login */}
          <div className="w-1/2 h-full">
            <div className="w-full h-full flex justify-center items-center">
              <Image src={IMAGES.LoginScreen}></Image>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
