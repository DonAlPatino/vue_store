import { expect, describe, beforeEach, afterEach, it } from 'vitest'
import { render, fireEvent, cleanup } from '@testing-library/vue'
import SettingsForm from './SettingsForm.vue'
import { SettingsDatabase, dbsInit } from '../db.ts'

const waitForDbUpdate = async (db: SettingsDatabase) => {
  await db.transaction('rw', db.settings, () => { })
}

describe('SettingsForm.vue', () => {
  let sdb: SettingsDatabase

  beforeEach(async () => {
    // Создаем новую базу данных для каждого теста
    sdb = new SettingsDatabase()

    // Инициализируем базу данных с настройками по умолчанию
    await dbsInit()
  })

  afterEach(async () => {
    // Закрываем базу данных после каждого теста
    if (sdb && sdb.isOpen()) {
      sdb.close()
    }

    // Очищаем DOM после каждого теста
    cleanup()
  })

  it('Проверяем, что подписи тем отображаются правильно', async () => {
    const screen = render(SettingsForm)

    // Проверяем, что компонент отображает текст "Тема:"
    expect(screen.getByText('Тема:')).toBeTruthy()

    // Находим подпись для тёмной темы
    const darkThemeLabelElements = screen.getAllByText(/тёмная/)
    expect(darkThemeLabelElements.length).toBe(1)

    // Находим подпись для светлой темы
    const lightThemeLabelElements = screen.getAllByText(/светлая/)
    expect(lightThemeLabelElements.length).toBe(1)

    // Проверяем, что тема по умолчанию — светлая
    const settings = await sdb.settings.get(1)
    expect(settings?.theme).toBe('light')
  })

  it('Изменение темы при клике на подписи', async () => {
    const { getByText } = render(SettingsForm)

    // Нажимаем на кнопку "тёмная"
    fireEvent.click(getByText('тёмная'))

    await waitForDbUpdate(sdb)

    // Проверяем, что тема изменилась на "dark"
    let settings = await sdb.settings.get(1)
    expect(settings?.theme).toBe('dark')

    // Нажимаем на кнопку "светлая"
    fireEvent.click(getByText('светлая'))

    await waitForDbUpdate(sdb)

    // Проверяем, что тема изменилась на "light"
    settings = await sdb.settings.get(1)
    expect(settings?.theme).toBe('light')
  })
})