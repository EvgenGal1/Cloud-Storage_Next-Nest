// ^ список файлов
import React from 'react';
import Selecto from 'react-selecto';

import { FileItem } from '@/api/dto/files.dto';
import { FileCard } from '@/components/FileCard';

import styles from './FileList.module.scss';

// тип выделен или убрано
export type FileSelectType = 'select' | 'unselect';

interface FileListProps {
  items: FileItem[];
  // fn опред.ф. выделен/убрано
  onFileSelect?: (id: /* string | */ number, type: FileSelectType) => void;
}

export const FileList: React.FC<FileListProps> = ({ items, onFileSelect }) => {
  return (
    <div className={styles.root}>
      {items.map((item) => (
        // передача id ч/з data-id в div карт.ф.
        <div data-id={item.id} key={item.id} className="file">
          <FileCard filename={item.filename} originalName={item.originalName} />
        </div>
      ))}
      {/* Выборка файлов */}
      <Selecto
        // блок выделения
        // @ts-ignore // ! от ошб. - Тип "string" не может быть назначен для типа "HTMLElement"
        container=".files"
        // эл.выделения
        selectableTargets={['.file']}
        selectByClick
        hitRate={10}
        selectFromInside
        toggleContinueSelect={['shift']}
        continueSelect={false}
        onSelect={(e) => {
          // выделен
          e.added.forEach((el) => {
            el.classList.add('active');
            // @ts-ignore // ! от ошб. - Не удается вызвать объект, который может иметь значение "undefined".
            onFileSelect(Number(el.dataset['id']), 'select');
          });
          // убрано выделение
          e.removed.forEach((el) => {
            el.classList.remove('active');
            // @ts-ignore // ! от ошб. - Не удается вызвать объект, который может иметь значение "undefined".
            onFileSelect(Number(el.dataset['id']), 'unselect');
          });
        }}
      />
    </div>
  );
};
