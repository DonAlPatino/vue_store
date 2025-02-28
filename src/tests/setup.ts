import { indexedDB, IDBKeyRange } from 'fake-indexeddb'

// Объявляем fake-indexeddb как глобальный объект
global.indexedDB = indexedDB
global.IDBKeyRange = IDBKeyRange