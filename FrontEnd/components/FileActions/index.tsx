// ^ Комп.кнп.Удал.,Поделиться
import React from 'react';
import { Button, Popconfirm } from 'antd';

import styles from './FileActions.module.scss';

interface FileActionsProps {
  onClickRemove: VoidFunction;
  onClickShare: VoidFunction;
  isActive: boolean;
}

export const FileActions: React.FC<FileActionsProps> = ({
  onClickRemove,
  onClickShare,
  isActive,
}) => {
  return (
    <div className={styles.root}>
      {/* кнп.Поделиться // ! нет реализации */}
      <Button onClick={onClickShare} disabled={!isActive}>
        Поделиться
      </Button>
      {/* Окно подтверждения удал. */}
      <Popconfirm
        title="Удалить файл(ы)?"
        description="Все файлы будут перемещены в корзину"
        okText="Да"
        cancelText="Нет"
        disabled={!isActive}
        onConfirm={onClickRemove}
      >
        {/* кнп.Удалить */}
        <Button disabled={!isActive} type="primary" danger>
          Удалить
        </Button>
      </Popconfirm>
    </div>
  );
};
