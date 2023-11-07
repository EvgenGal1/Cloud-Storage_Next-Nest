// страница `панель приборов`
import { GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
// import axios from 'axios';
// import nookies from 'nookies';

// import * as Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import { Layout } from '@/layouts/Layout';
// import { DashboardLayout } from '@/layouts/DashboardLayout';
// import { checkAuth } from "@/utils/checkAuth";
import { checkAuth } from '@/utils/checkAuth';
// import { Files } from "@/modules/Files";
import { Header } from '@/components/Header';

interface Props {
  items: FileItem[];
}

const DashboardPage: NextPage /* <Props> */ = (/* { items } */) => {
  return (
    <main>
      {/* <Header /> // откл. > getLayout */}
      <div>Панель инструментов</div>
    </main>
    // <DashboardLayout>
    //   <Files items={items} withActions />
    // </DashboardLayout>
  );
};

// отрисов.ч/з getLayout(`Получите макет`) для стр.
DashboardPage.getLayout = (page: React.ReactNode) => {
  // fn возврата jsx разметки
  return <Layout title="Dashboard / Главная">{page}</Layout>;
};

// `Получить реквизиты на стороне сервера` проверка на SRV что user Авториз.
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // вызов fn()Авториз.
  const authProps = await checkAuth(ctx);

  // есть ли `перенаправить` в объ.res в мтд.checkAuth
  if ('redirect' in authProps) {
    // отправ.на Авториз.
    return authProps;
  }
  return {
    // е/и redirect нет возвращ.пуст.props(остаёмся на "/dashboard")
    props: {},
  };
};

export default DashboardPage;
