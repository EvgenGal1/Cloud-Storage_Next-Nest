// ^ загр.файл
import React from 'react';
import { FileTextOutlined } from '@ant-design/icons';
import Image from 'next/image';

import { getExtensionFromFileName } from '@/utils/getExtensionFromFileName';
import { getColorByExtension } from '@/utils/getColorByExtension';
import { isImage } from '@/utils/isImage';

import styles from './FileCard.module.scss';

interface FileCardProps {
  filename: string;
  originalName: string;
}

// приним.2 парам. Настоящее и генер.имя
export const FileCard: React.FC<FileCardProps> = ({
  originalName,
  filename,
}) => {
  console.log('filename ', filename);
  // берём.расшир.ф.
  const ext = getExtensionFromFileName(filename);
  // путь к Изо(е/и расшир.Изо) или пуст.строка
  const imageUrl =
    ext && isImage(ext) ? 'http://localhost:7531/uploads/' + filename : '';

  // опред.цвета по расшир.ч/з fn
  const color = getColorByExtension(ext);
  // кл.из stl по расшир.
  const classColor = styles[color];

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        {/* отрис.расшир.ф. */}
        <i className={classColor}>{ext}</i>
        {/* отсовка Изо(е/и расшир.Изо) или Иконка из @ant-design */}
        {isImage(ext) ? (
          <>
            <img className={styles.image} src={imageUrl} alt="File" />
            {/* //  от ошб. Using `<img>` could result in slower LCP ... `<Image />` from `next/image` */}
            {/* <Image className={styles.image} src={imageUrl} alt="File" /> */}
          </>
        ) : (
          <FileTextOutlined />
        )}
      </div>
      {/* Настоящ.назв.ф. */}
      <span>{originalName}</span>
    </div>
  );
};