// ^ стр.`мусор`(пометка удал.ф.)
import { GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';

import * as Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import { Layout } from '@/layouts/Layout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { checkAuth } from '@/utils/checkAuth';
import { Files } from '@/modules/Files';
import { FileList } from '@/components/FileList';

interface Props {
  items: FileItem[];
}

const DashboardTrash: NextPage<Props> = ({ items }) => {
  // ! Свойство "getLayout" не существует в типе "FunctionComponent<{}> & ...
  // ~~ вар.решения убрать тип для const и постав.тип для парам.
  // const DashboardTrash = ({ items } :any) => {
  return (
    <DashboardLayout>
      {/* <Files items={items} /> */}
      <FileList items={items} />
    </DashboardLayout>
  );
};

// @ts-ignore // ! от ошб. - Свойство "getLayout" не существует в типе "FunctionComponent<{}> & ...
DashboardTrash.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Корзина">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ('redirect' in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll('trash');

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

export default DashboardTrash;
