// ^ выбор расшир.ф. из назв.ф.
import { Extension } from '@/utils/getColorByExtension';

export const getExtensionFromFileName = (filename: string) => {
  console.log('filename : ' + filename);
  return filename.split('.').pop() as Extension;
};
