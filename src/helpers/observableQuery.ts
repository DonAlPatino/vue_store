import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'
import type { Ref } from 'vue'

// Функция, обеспечивающая реактивное получение данных из базы.
// https://dexie.org/docs/liveQuery()
// https://vueuse.org/rxjs/useObservable/
export default <T>(
  query: () => Promise<T>,
): Readonly<Ref<T>> => {
  return useObservable(liveQuery(query) as any) as Readonly<Ref<T>>
}