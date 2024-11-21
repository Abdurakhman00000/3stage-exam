"use client";

import React, {useState } from 'react';
import Link from 'next/link';
import { useDeleteDataMutation, useGetDataQuery, useUpdateDataMutation } from '@/redux/api/data';
import scss from "./GetData.module.scss"

const GetData: React.FC = () => {
  const [deleteUser] = useDeleteDataMutation()
  const [updateUser] = useUpdateDataMutation();
  const { data } = useGetDataQuery();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [newFirstName, setNewFirstName] = useState<string>("");
  const [newLastName, setNewLastName] = useState<string>("");

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Вы уверены, что хотите удалить этого пользователя?");
    if (confirmDelete) {
      try {
        await deleteUser(id).unwrap();
      } catch (error) {
        console.error('Ошибка при удалении пользователя:', error);
      }
    }
  };

  const handleEdit = (id: number, firstName: string, lastName: string) => {
    setEditingId(id);
    setNewFirstName(firstName);
    setNewLastName(lastName);
  };

  const handleUpdate = async (id: number) => {
    try {
      const updatedUser = {
        id,
        firstName: newFirstName,
        lastName: newLastName,
      };
      await updateUser(updatedUser).unwrap(); 
      setEditingId(null); 
    } catch (error) {
      console.error('User update error:', error);
    }
  };




  

  return (
    <section className={scss.Main}>
      <div className="container">
        <h1>Список пользователей</h1>
        <Link href='/'>
          <div className={scss.exit_button}>
          <button>Назад</button>
          </div>
        </Link>
        <div className={scss.content}>
          {
            data?.slice().reverse().map((item) => (
              <div key={item.id} className={scss.main_data}>
                {editingId === item.id ? (
                  <div className={scss.edit_form}>
                    <input
                      type="text"
                      value={newFirstName}
                      onChange={(e) => setNewFirstName(e.target.value)}
                      placeholder="Новое имя"
                    />
                    <input
                      type="text"
                      value={newLastName}
                      onChange={(e) => setNewLastName(e.target.value)}
                      placeholder="Новая фамилия"
                    />
                    <button onClick={() => handleUpdate(item.id)}>Сохранить</button>
                    <button onClick={() => setEditingId(null)}>Отмена</button>
                  </div>
                ) : (
                  <>
                    <div className={scss.data_list}>
                    <div>
                    <img src={item.image} alt="" />
                      <h2><span>Имя:</span> {item.firstName}</h2>
                      <h2><span>Фамилия:</span> {item.lastName}</h2>
                    </div>
                    <div>
                      <p><span>Email:</span> {item.email}</p>
                      <h5></h5>
                      <button onClick={() => handleEdit(item.id, item.firstName, item.lastName)}>Редактировать</button>
                      <button onClick={() => handleDelete(item.id)}>Удалить</button>
                    </div>
                    </div>
                  </>
                )}
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default GetData;