// ^ стр.Профиля
import { GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import { Button } from 'antd';

import * as Api from '@/api';
import { User } from '@/api/dto/auth.dto';
import { checkAuth } from '@/utils/checkAuth';
import { Layout } from '@/layouts/Layout';
import DashboardPage from '@/pages/dashboard/index';

import styles from '@/styles/Profile.module.scss';

// типиз.данн.user ч/з interface
interface Props {
  userData: User;
}

// const DashboardProfilePage : NextPage<Props> = ({ userData }) => {
// !! Свойство "getLayout" не существует в типе "FunctionComponent<{}> & ...
// ~~ вар.решения убрать тип для const и постав.тип для парам.
const DashboardProfilePage = ({ userData }: any) => {
  // кнп.Выход
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      Api.auth.logout();
      location.href = '/';
    }
  };

  // отрисовка данн.user
  return (
    <main>
      <div className={styles.root}>
        <h1>Мой профиль</h1>
        <br />
        <p>
          ID: <b>{userData.id}</b>
        </p>
        <p>
          Полное имя: <b>{userData.fullName}</b>
        </p>
        <p>
          E-Mail: <b>{userData.email}</b>
        </p>
        <br />
        <Button onClick={onClickLogout} type="primary" danger>
          Выйти
        </Button>
      </div>
    </main>
  );
};

// отрисов.ч/з getLayout(`Получите макет`) для стр.
DashboardProfilePage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Профиль">{page}</Layout>;
};

// `получить реквизиты на стороне сервера` е/и user Авториз. получ.данн.user
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // вызов fn()Авториз.
  const authProps = await checkAuth(ctx);

  // есть ли `перенаправить` в объ.res в мтд.checkAuth
  if ('redirect' in authProps) {
    // отправ.на Авториз.
    return authProps;
  }

  // получ.данн.user е/и Авториз.
  const userData = await Api.auth.getMe();

  // возвращ.в props данн.user
  return {
    props: {
      userData,
    },
  };
};

export default DashboardProfilePage;
