// ^ кнп.загр.ф.
import React from 'react';
import { Button, Upload, UploadFile, notification } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

import * as Api from '@/api';

import styles from '@/styles/Home.module.scss';

export const UploadButton: React.FC = () => {
  // state для хран.выран.ф.
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  // лог./fn загр.ф.в БД
  const onUploadSuccess = async (options: any) => {
    try {
      // загр.ф.в БД
      await Api.files.uploadFile(options);

      // очистка списка state
      setFileList([]);

      // перезагр.текущ.стр.
      window.location.reload();
    } catch (err) {
      // окно`уведомление` о ошб.загр.
      notification.error({
        message: 'Ошибка!',
        description: 'Не удалось загрузить файл',
        duration: 2,
      });
    }
  };

  return (
    // Комп.Upload из antd
    <Upload
      // передача.fn загр.ф.
      customRequest={onUploadSuccess}
      // указ.выбран.ф.
      fileList={fileList}
      // fn выбора ф.
      onChange={({ fileList }) => setFileList(fileList)}
      className={styles.upload}
    >
      {/* кнп.для окна выбора файла */}
      <Button type="primary" icon={<CloudUploadOutlined />} size="large">
        Загрузить файл
      </Button>
    </Upload>
  );
};
