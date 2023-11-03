// страница `панель приборов`
import { GetServerSidePropsContext, NextPage } from 'next';
// import { checkAuth } from "@/utils/checkAuth";
import React from 'react';
// import { Layout } from "@/layouts/Layout";

import * as Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import axios from 'axios';
// import { DashboardLayout } from "@/layouts/DashboardLayout";
// import { Files } from "@/modules/Files";

import nookies from 'nookies';
import { checkAuth } from '@/utils/checkAuth';

interface Props {
  items: FileItem[];
}

const DashboardPage: NextPage /* <Props> */ = (/* { items } */) => {
  return (
    <div>Панель инструментов</div>
    // <DashboardLayout>
    //   <Files items={items} withActions />
    // </DashboardLayout>
  );
};

// DashboardPage.getLayout = (page: React.ReactNode) => {
//   return <Layout title="Dashboard / Главная">{page}</Layout>;
// };

// `Получить реквизиты на стороне сервера` проверка на SRV что user Авториз.
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // вызов fn()Авториз.
  const authProps = await checkAuth(ctx);

  // есть ли redirect в объ.res checkAuth
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
