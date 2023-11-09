// ^ Макет Панели Инструментов для Изо, Фото, Корзины
import React from 'react';
import { useRouter } from 'next/router';
import { Menu } from 'antd';
import {
  DeleteOutlined,
  FileImageOutlined,
  FileOutlined,
} from '@ant-design/icons';

import { UploadButton } from '@/components/UploadButton';

import styles from '@/styles/Home.module.scss';

export const DashboardLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const selectedMenu = router.pathname;

  return (
    <main className={styles.dashboardContainer}>
      {/* кнп.загр.ф. и Навигация */}
      <div className={styles.sidebar}>
        <UploadButton />
        {/* Навигация. Файлы, Фото, Корзина */}
        <Menu
          className={styles.menu}
          mode="inline"
          // передача масс.путей/пунктов в Меню по выбранных
          selectedKeys={[selectedMenu]}
          // ссылки перехода на страницы
          items={[
            {
              key: `/dashboard`,
              icon: <FileOutlined />,
              label: `Файлы`,
              onClick: () => router.push('/dashboard'),
            },
            {
              key: `/dashboard/photos`,
              icon: <FileImageOutlined />,
              label: `Фото`,
              onClick: () => router.push('/dashboard/photos'),
            },
            {
              key: `/dashboard/trash`,
              icon: <DeleteOutlined />,
              label: `Корзина`,
              onClick: () => router.push('/dashboard/trash'),
            },
          ]}
        />
      </div>
      {/* файлы */}
      <div className="container">{children}</div>
    </main>
  );
};
