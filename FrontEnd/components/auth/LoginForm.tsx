// Форма Авторизации с эл.,валид.из antd и сохр.Токен/Cookie ч/з nookies
import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { setCookie } from 'nookies';

import { LoginFormDTO } from '@/api/dto/auth.dto';
import styles from './LoginForm.module.scss';

// мтд.из api/index.ts
import * as Api from '@/api';

export const LoginForm: React.FC = () => {
  // обраб.формы
  const onSubmit = async (values: LoginFormDTO) => {
    try {
      // Авториз. по мтд.подкл.в api/index.ts
      const { token } = await Api.auth.login(values);

      // окно`уведомление` о успешном req
      notification.success({
        message: 'Успешно!',
        description: 'Переходим в админ-панель...',
        duration: 2,
      });

      // сохр.Токен
      setCookie(null, '_token', token, {
        path: '/',
      });

      //     location.href = "/dashboard";
    } catch (err) {
      console.warn('LoginForm', err);
      notification.error({
        message: 'Ошибка!',
        description: 'Неверный логин или пароль',
        duration: 2,
      });
    }
  };

  return (
    <div className={styles.formBlock}>
      {/* Форма Авторизации с эл.,валид.из antd */}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        onFinish={onSubmit}
      >
        {/* Поле Email */}
        <Form.Item
          label="E-Mail"
          name="email"
          rules={[
            {
              required: true,
              message: 'Укажите почту',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* Поле Пароль */}
        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: 'Укажите пароль',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        {/* кнп.Войти */}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
