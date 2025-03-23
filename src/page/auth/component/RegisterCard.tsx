import { registerApi } from "@/services/auth/auth";
import { IBodyRegister } from "@/services/auth/auth.interface";
import { Button, Form, Input } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface IProps {
  changeFormType: () => void;
}

export const RegisterCard = ({ changeFormType }: IProps) => {
  const RegisterBodySchema: yup.ObjectSchema<IBodyRegister> = yup.object({
    name: yup.string().required("Fullname is required"),
    gmail: yup
      .string()
      .email("email is not valid")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    rePassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBodyRegister>({
    mode: "onChange",
    resolver: yupResolver(RegisterBodySchema),
  });
  const mutationRegister = useMutation({
    mutationFn: (values: IBodyRegister) =>
      registerApi({
        body: values,
        notifyConfig: {
          success: "Register success",
          error: "Error has occur, please try again later",
        },
      }),
    onSuccess: () => {
      changeFormType();
    },
  });

  const onSubmit = (values: IBodyRegister) => {
    mutationRegister.mutate(values);
  };
  return (
    <React.Fragment>
      <div className="flex flex-col w-full space-y-4">
        <span className="w-full text-2xl">Register now!</span>
        <Form validationBehavior="aria" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full space-y-3">
            <Input
              label="Fullname"
              errorMessage={errors.name?.message}
              isInvalid={Boolean(errors.name?.message)}
              isRequired
              {...register("name")}
            ></Input>
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
            <Input
              label="Confirm password"
              type="Password"
              errorMessage={errors.rePassword?.message}
              isInvalid={Boolean(errors.rePassword?.message)}
              isRequired
              {...register("rePassword")}
            ></Input>
            <div className="flex space-x-1 m-auto text-sm">
              <span>Already have accout?</span>
              <span
                className="underline text-blue-600 cursor-pointer"
                onClick={changeFormType}
              >
                Log in now
              </span>
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
};
