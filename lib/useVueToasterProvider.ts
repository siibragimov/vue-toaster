import type { Toast, ToastItem, ToastTimeouts } from './types'
import type { InjectionKey } from 'vue'
import { computed, provide, ref } from 'vue'
import { TOASTER_DELETE_DELAY } from './consts'
import { createInjector, useToMaybe } from './utils'

type ToasterState = ReturnType<typeof useVueToasterInit>
const stateKey: InjectionKey<ToasterState> = Symbol('vue-toaster-state')

export const useVueToaster = createInjector(stateKey)

export const useVueToasterInit = (props: { teleportName: string }) => {
  const items = ref<ToastItem[]>([])
  const toasterItems = computed(() => items.value)
  const deleteTimeout: ToastTimeouts = {}
  const teleportName = computed<string>(() => props.teleportName)

  const pushToast = (item: Toast) => {
    const createdAt: number = Date.now()
    const newItem = { ...item, createdAt }
    items.value.push(newItem)
    deleteWithDelay(newItem)
  }

  const deleteToast = (createdAt: number) => {
    const index = useToMaybe(items.value.findIndex((item) => item.createdAt === createdAt))
    if (index === null) {
      return
    }

    items.value = items.value.toSpliced(index, 1)
    clearTimeout(deleteTimeout[createdAt])
  }

  const deleteWithDelay = (item: ToastItem) => {
    deleteTimeout[item.createdAt] = setTimeout(() => {
      deleteToast(item.createdAt)
    }, item?.delay ?? TOASTER_DELETE_DELAY)
  }

  const state = {
    deleteToast,
    pushToast,
    toasterItems,
    teleportName,
  }

  provide(stateKey, state)
  return state
}
