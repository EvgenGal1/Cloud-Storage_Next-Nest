// ^ мтд.req > БД для Авториз./Регистр./Польз.
import axios from '@/core/axios';

import { FileItem } from '@/api/dto/files.dto';

type FileType = 'all' | 'photos' | 'trash';

// мтд.получ.ф. по опред.типу
export const getAll = async (type: FileType = 'all'): Promise<FileItem[]> => {
  return (await axios.get('/files?type=' + type)).data;
};

// мтд.удал.ф.(получ.масс.id)
export const remove = (ids: number[]): Promise<void> => {
  return axios.delete('/files?ids=' + ids);
};

// мтд.загр.ф.(получ. options Комп.upload)
export const uploadFile = async (options: any) => {
  const { onSuccess, onError, file, onProgress } = options;

  // formData где хран.ф.
  const formData = new FormData();
  formData.append('file', file);

  // конфигурация для axios
  const config = {
    // отправ.form-data
    headers: { 'Content-Type': 'multipart/form-data' },
    // при req вычислять скок.% загр.
    onProgress: (event: ProgressEvent) => {
      onProgress({ percent: (event.loaded / event.total) * 100 });
    },
  };

  try {
    // отпр.req с настр.
    const { data } = await axios.post('files', formData, config);

    // при успехе вызов `на успех` от Комп.upload из options
    onSuccess();

    // возвращ.данн.
    return data;
  } catch (err) {
    // при ошб. вызов `на ошибке` из options
    onError({ err });
  }
};
