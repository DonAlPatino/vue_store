import Dexie from 'dexie'
import type { Table } from 'dexie'
import type { Theme } from './types/Theme'

/*   Объявление интерфейса таблицы с перечислением столбцов
 *   -- settings --
 *   +------------+
 *   | id | theme |
 *   +------------+
 */
export interface ISettings {
  // Здесь мы всегда будем использовать строку с id === 1,
  // поэтому указываем 1 в качестве типа
  id: 1
  theme?: Theme
}

export class SettingsDatabase extends Dexie {
  // Объявляем таблицу
  settings!: Table<ISettings>

  constructor() {
    super('SettingsDatabase')

    // Обозначаем поля, для которых будут созданы индексы
    this.version(1).stores({
      // Здесь прописываются столбцы, по которым в коде будет поиск
      // Поскольку по столбцу theme мы искать никогда ничего не будем,
      // здесь его и не пишем.
      settings: '&id',
    })
  }
}

// Data Base Settings (sdb) — декларируем базу
// База в хранилище будет создана только при первом обращении-записи.
export const sdb = new SettingsDatabase()

// Этот объект экспортируется, т. к. потребуется при тестировании
export const dbsDefaultSettings: ISettings = { id: 1, theme: 'light' }

// Эта функция тоже потребуется при тестировании
export const dbsInit = async () => {
  const notInitialized = !(await sdb.settings.get(1))?.id

  // Если записей нет, делаем первую запись, чтобы работал метод update().
  // Если запись уже есть, не трогаем.
  if (notInitialized) {
    sdb.settings.put(dbsDefaultSettings)
  }
}

dbsInit()