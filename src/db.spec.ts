import { describe, it, expect, beforeAll } from 'vitest'
import { SettingsDatabase, dbsInit, dbsDefaultSettings } from './db'

describe('SettingsDatabase', () => {
  let db: SettingsDatabase

  beforeAll(async () => {
    // Создаём новую базу данных
    db = new SettingsDatabase()
    await db.open()
    await db.settings.clear() // Очищаем таблицу
  })

  it('Инициализируем базы данных', async () => {
    // Проверяем, что база данных пуста
    const initialSettings = await db.settings.get(1)
    expect(initialSettings).toBeUndefined()

    // Инициализируем базу данных
    await dbsInit()

    // Проверяем, что начальные настройки добавлены
    const settings = await db.settings.get(1)
    expect(settings).toEqual(dbsDefaultSettings)

    await db.settings.clear() // Очищаем таблицу после теста
  })

  it('Обновляем тему', async () => {
    // Инициализируем базу данных
    await dbsInit()

    // Обновляем тему
    await db.settings.update(1, { theme: 'dark' })

    // Проверяем, что тема обновилась
    const updatedSettings = await db.settings.get(1)
    expect(updatedSettings?.theme).toBe('dark')

    await db.settings.clear() // Очищаем таблицу после теста
  })

  it('Инициализируем базу данных, когда она уже используется', async () => {
    // Инициализируем базу данных
    await dbsInit()

    // Проверяем, что начальные настройки добавлены
    const initialSettings = await db.settings.get(1)
    expect(initialSettings).toEqual(dbsDefaultSettings)

    // Меняем значение темы
    await db.settings.update(1, { theme: 'dark' })

    // Пытаемся инициализировать базу данных ещё раз
    await dbsInit()

    // Проверяем, что записанная ранее тема не затёрта
    const settings = await db.settings.get(1)
    expect(settings?.theme).toEqual('dark')
  })
})