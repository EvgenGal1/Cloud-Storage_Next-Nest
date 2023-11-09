// ^ Главн.Стр./DashboardPage(стр.`панель приборов`)
import { GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';

import * as Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import { Layout } from '@/layouts/Layout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { checkAuth } from '@/utils/checkAuth';
// import { Files } from '@/modules/Files';
import { FileList } from '@/components/FileList';

import { useRouter } from 'next/router';

// приним.масс.ф.с БД
interface Props {
  items: FileItem[];
}

// приним.масс.ф.с БД
const DashboardPage: NextPage<Props> = ({ items }) => {
  // ! Свойство "getLayout" не существует в типе "FunctionComponent<{}> & ...
  // ~~ вар.решения убрать тип для const и постав.тип для парам.
  // const DashboardPage = ({ items }: any) => {

  const router = useRouter();
  const selectedMenu = router.pathname;

  return (
    <DashboardLayout>
      {/* <Files items={items} withActions /> */}
      <FileList items={items} />
    </DashboardLayout>
  );
};

// отрисов.ч/з getLayout(`Получите макет`) для Главн.стр.
// @ts-ignore // ! от ошб. - Свойство "getLayout" не существует в типе "FunctionComponent<{}> & ...
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

  // req список всех файлов с БД
  try {
    const items = await Api.files.getAll();

    return {
      props: {
        items,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { items: [] },
    };
  }
};

export default DashboardPage;
