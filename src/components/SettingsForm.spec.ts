import { vi, expect, describe, beforeEach, afterEach, it } from 'vitest'
import { render, fireEvent, cleanup } from '@testing-library/vue'
import SettingsForm from './SettingsForm.vue'

describe('SettingsForm.vue', () => {
  let store: Record<string, string> = {}

  beforeEach(() => {
    // Мок для localStorage
    vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => ({
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => (store[key] = value.toString()),
      removeItem: (key: string) => delete store[key],
      clear: () => (store = {}),
      length: Object.keys(store).length, // Добавляем свойство length
      key: (index: number) => Object.keys(store)[index] || null, // Добавляем метод key
    }))

    // Очищаем localStorage перед каждым тестом
    window.localStorage.clear()
  })

  afterEach(() => {
    // Очищаем DOM после каждого теста
    cleanup()
  })

  it('Проверяем, что подписи тем отображаются правильно', async () => {
    const screen = render(SettingsForm)
    // Проверяем, что компонент отображает текст "Тема:"
    expect(screen.getByText('Тема:')).toBeTruthy()
    // Находим подпись для тёмной темы
    expect(screen.getAllByText(/тёмная/).length).toBe(1)
    // Находим подпись для светлой темы
    expect(screen.getAllByText(/светлая/).length).toBe(1)
    // Проверяем, что тема по умолчанию — светлая
    expect(window.localStorage.getItem('settings-storage')).toBe(
      JSON.stringify({ theme: 'light' })
    )
  })

  it('Изменение темы при клике на кнопке "тёмная"', async () => {
    const { getByText } = render(SettingsForm)
    // Нажимаем на кнопку "тёмная"
    await fireEvent.click(getByText('тёмная'))
    // Проверяем, что тема изменилась на "dark"
    expect(window.localStorage.getItem('settings-storage')).toBe(
      JSON.stringify({ theme: 'dark' })
    )
    // Нажимаем на кнопку "светлая"
    await fireEvent.click(getByText('светлая'))
    // Проверяем, что тема изменилась на "light"
    expect(window.localStorage.getItem('settings-storage')).toBe(
      JSON.stringify({ theme: 'light' })
    )
  })
})