import React from 'react';
import { useRouter } from 'next/router';
import { Layout, Avatar, Menu, Popover, Button } from 'antd';
import { CloudOutlined } from '@ant-design/icons';

import styles from './Header.module.scss';

import * as Api from '@/api';

export const Header: React.FC = () => {
  // настр.маршр. Хук и перем.конкретн.путь нахождения
  const router = useRouter();
  const selectedMenu = router.pathname;

  // Выход с удал.Токен и переход на Авториз.
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      Api.auth.logout();
      location.href = /* '/' */ '/dashboard/auth';
    }
  };

  return (
    <Layout.Header className={styles.root}>
      <div className={styles.headerInner}>
        {/* ЛОГО и МЕНЮ */}
        <div className={styles.headerLeft}>
          {/* ЛОГО */}
          <h2>
            <CloudOutlined />
            Cloud Storage
          </h2>
          {/* МЕНЮ */}
          <Menu
            className={styles.topMenu}
            theme="dark"
            mode="horizontal"
            // передача пути в Меню
            defaultSelectedKeys={[selectedMenu]}
            //авто.опред.Меню какой путь подсвечивать
            onSelect={({ key }) => router.push(key)}
            // ссылки перехода на страницы
            items={[
              { key: '/dashboard', label: 'Главная' },
              { key: '/dashboard/profile', label: 'Профиль' },
            ]}
          />
        </div>
        {/* блок с Popover на аватар (по клик всплыв.окно с доп.контент) */}
        <div className={styles.headerRight}>
          <Popover
            trigger="click"
            content={
              <Button onClick={onClickLogout} type="primary" danger>
                Выйти
              </Button>
            }
          >
            <Avatar>Avt</Avatar>
          </Popover>
        </div>
      </div>
    </Layout.Header>
  );
};
