"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePostDataMutation } from "@/redux/api/data";
import scss from "./AddData.module.scss";

interface UserFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const AddData: React.FC = () => {
  const [createUser] = usePostDataMutation();
  const { register, handleSubmit, reset } = useForm<UserFormInputs>();
  const [image, setImage] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (value: UserFormInputs) => {
    try {
      const data = {
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: value.password,
        image: image,
      };
      await createUser(data).unwrap();
      reset();
      router.push("/data-res");
    } catch (error) {
      console.error("Ошибка при создании пользователя:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if ((file && file.type === "image/png") || file?.type === "image/jpeg") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(image);

  return (
    <section className={scss.Main}>
      <div className="container">
        <h2>Создать пользователя</h2>
        <div className={scss.content}>
          {image ? (
            <img width={300} height={200} src={image} alt="" />
          ) : (
            <div></div>
          )}

          <div className={scss.upload}>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/png,image/jpeg"
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("firstName", { required: true })}
              placeholder="Имя"
            />
            <input
              {...register("lastName", { required: true })}
              placeholder="Фамилия"
            />
            <input
              {...register("email", { required: true })}
              placeholder="Email"
            />
            <input
              {...register("password", { required: true })}
              placeholder="Пароль"
              type="password"
            />
            <button>Создать пользователя</button>
          </form>

          <Link href="/data-res">
            <div className={scss.data_button}>
              <button>Посмотреть пользователей</button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AddData;
