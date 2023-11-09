// ^ стр.Фото
import { GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';

import * as Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import { Layout } from '@/layouts/Layout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { checkAuth } from '@/utils/checkAuth';
import { Files } from '@/modules/Files';

interface Props {
  items: FileItem[];
}

const DashboardPhotos: NextPage<Props> = ({ items }) => {
  // !! Свойство "getLayout" не существует в типе "FunctionComponent<{}> & ...
  // const DashboardPhotos = ({ items }: any) => {
  return (
    <DashboardLayout>
      <Files items={items} withActions />
    </DashboardLayout>
  );
};

DashboardPhotos.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Фотографии">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ('redirect' in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll('photos');

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

export default DashboardPhotos;
