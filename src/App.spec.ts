import { expect, describe, it } from 'vitest'
import { render, fireEvent, waitFor } from '@testing-library/vue'
import App from './App.vue'

describe('App.vue', () => {
  it('Проверяем обновление темы', async () => {
    // Рендерим компонент
    const screen = render(App)

    // Находим корневой элемент DOM
    let appContainer = screen.container.firstElementChild

    // Ищем элемент подписи тёмной темы
    const darkThemeLabelElement = screen.getByText(/тёмная/)
    // Щёлкаем по нему
    fireEvent.click(darkThemeLabelElement)
    // Ждём, пока у корневого элемента не появится css-класс тёмной темы
    await waitFor(() => {
      expect(appContainer?.classList.contains('dark')).toBe(true)
    })

    // Класса неактивной светлой темы у корневого элемента быть не должно
    expect(appContainer?.classList.contains('light')).toBe(false)

    // Ищем элемент подписи светлой темы
    const lightThemeLabelElement = screen.getByText(/светлая/)
    // Щёлкаем по нему
    fireEvent.click(lightThemeLabelElement)

    // Ждём, пока у корневого элемента не появится css-класс светлой темы
    await waitFor(() => {
      expect(appContainer?.classList.contains('light')).toBe(true)
    })

    // Класса неактивной тёмной темы у корневого элемента быть не должно
    expect(appContainer?.classList.contains('dark')).toBe(false)
  })
})