// ^ умн.Комп. Использ др.Комп.(кнп. и ф.) + своя логика
import React from 'react';
import { Empty } from 'antd';

import * as Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import { FileActions } from '@/components/FileActions';
import { FileList, FileSelectType } from '@/components/FileList';

interface FilesProps {
  items: FileItem[];
  withActions?: boolean;
}

export const Files: React.FC<FilesProps> = ({ items, withActions }) => {
  // state id файлов и выборки
  const [files, setFiles] = React.useState(items || []);
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);

  // выборка файлов
  const onFileSelect = (id: number, type: FileSelectType) => {
    if (type === 'select') {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((_id) => _id !== id));
    }
  };

  // Удаление
  const onClickRemove = () => {
    // очистка выбраных ф.
    setSelectedIds([]);
    // удал.ф.из state
    setFiles((prev) => prev.filter((file) => !selectedIds.includes(file.id)));
    // удал.с БД
    Api.files.remove(selectedIds);
  };

  // Поделиться // ! нет реализации
  const onClickShare = () => {
    alert(`Выделены файлы с id ${selectedIds}`);
  };

  return (
    <div>
      {/* отрис.ф. или `Пустой` */}
      {files.length ? (
        <>
          {/* кнп.Удал.,Поделиться отраж.ч/з props withActions */}
          {withActions && (
            <FileActions
              onClickRemove={onClickRemove}
              onClickShare={onClickShare}
              isActive={selectedIds.length > 0}
            />
          )}
          {/* // список файлов */}
          <FileList items={files} onFileSelect={onFileSelect} />
        </>
      ) : (
        <Empty className="empty-block" description="Список файлов пуст" />
      )}
    </div>
  );
};
