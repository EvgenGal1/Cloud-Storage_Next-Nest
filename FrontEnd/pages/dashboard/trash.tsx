// ^ стр.`мусор`(пометка удал.ф.)
import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';

import * as Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import { checkAuth } from '@/utils/checkAuth';
import { Layout } from '@/layouts/Layout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Files } from '@/modules/Files';

interface Props {
  items: FileItem[];
}

const DashboardTrash: NextPage<Props> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} />
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
