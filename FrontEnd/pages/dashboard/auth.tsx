// отдел.стр.для Авториз./Регистр. в ЛК user
import { NextPage } from 'next';
import Head from 'next/head';
import { Tabs } from 'antd';

import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';

const AuthPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard / Auth</title>
      </Head>
      <main style={{ width: 400, margin: '50px auto', textAlign: 'center' }}>
        {/* Формы Авториз./Регистр. перекл. ч/з Tabs от antd */}
        <Tabs
          items={[
            {
              label: 'Войти',
              key: '1',
              children: <LoginForm />,
            },
            {
              label: 'Регистрация',
              key: '2',
              children: <RegisterForm />,
            },
          ]}
        />
      </main>
    </>
  );
};

export default AuthPage;
