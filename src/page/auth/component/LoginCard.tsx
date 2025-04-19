import { loginApi } from "@/services/auth/auth";
import { IBodyLogin } from "@/services/auth/auth.interface";
import { useAuthStore } from "@/store/auth.store";
import { logError } from "@/util/logger";
import { Button, Form, Input } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface IProps {
  changeTypeForm: () => void;
}
export const LoginCard = ({ changeTypeForm }: IProps) => {
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
          success: false,
          error: "Error has occur, please try again later",
        },
      });
    },
    onSuccess: (response) => {
      const { message } = response;
      console.log(message);
      login(message.accessToken, message.refreshToken, message.id);
    },
    onError: (error) => {
      logError(error);
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
    <div className="flex flex-col w-full space-y-4">
      <span className="w-full text-2xl">WelCome Back</span>
      <Form validationBehavior="aria" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full space-y-3">
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
          <div className="flex space-x-1 m-auto text-sm">
            <span>doesn't have accout?</span>
            <span
              className="underline text-blue-600 cursor-pointer"
              onClick={changeTypeForm}
            >
              Register now
            </span>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};
