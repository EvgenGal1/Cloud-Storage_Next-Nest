// ^ цвет для кажд.расшир.ф.
const extColor = {
  pdf: 'purple',
  xls: 'green',
  doc: 'blue',
  txt: 'blue',
  png: 'red',
  jpg: 'gold',
  jpeg: 'orange',
  zip: 'red',
} as const;

// типы для списков Расшир. и Цветов(передача цвета только из объ.extColor)
export type Extension = keyof typeof extColor;
export type Color = (typeof extColor)[Extension];

// fn получ.расшир. и к нему возвращ.цвет
export const getColorByExtension = (ext: string): Color => {
  // return extColor[ext];
  // от ошб. Эл.неявно имеет тип "any", так как выражение типа "string" не может использоваться для индексации типа "{ readonly pdf:"purple"; ...} ...  не обнаружена сигнатура индекса с параметром типа "string"
  // "as Extension" - указ.что значение "ext" является допустимым ключом для объекта "extColor"
  return extColor[ext as Extension];
};
