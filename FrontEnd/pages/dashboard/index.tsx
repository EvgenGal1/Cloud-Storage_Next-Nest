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
  // const authProps = await checkAuth(ctx);
  const { _token } = nookies.get(ctx);
  console.log('_token ', _token);

  axios.defaults.headers.Authrization = 'Bearer ' + _token;

  // if ('redirect' in authProps) {
  //   return authProps;
  // }

  try {
    // const items = await Api.files.getAll();
    await Api.auth.getMe();

    return {
      // props: {
      //   items,
      // },
      // е/и от SRV нет ошб. остаёмся на "/dashboard"
      props: {},
    };
  } catch (err) {
    console.log('975 ', 975);
    console.log(err);
    console.log('876 ', 876);
    return {
      // props: { items: [] },
      // при ошб.с SRV переправ.на Форму Авториз.
      redirect: { destination: '/dashboard/auth', permanent: false },
    };
  }
};

export default DashboardPage;
