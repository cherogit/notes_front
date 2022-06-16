import {shallowReactive} from 'vue'
import {ApiError} from "@/typings"

type AbstractFunction = (...args: any[]) => any

export const useApiWrapper = <T extends AbstractFunction>(payloadGetter: T) => useAsyncWrapper<T, ApiError>(payloadGetter)
export const useAsyncWrapper = <T extends AbstractFunction, E extends Error>(payloadGetter: T) => {
  let state = shallowReactive({
    isCalled: false,
    isPending: false,
    isResolved: false,
    isRejected: false,
    error: null as E | null,
    result: null as Awaited<ReturnType<T>> | null,
    run: (async () => {
    }) as (...params: Parameters<T>) => Promise<void>
  })

  state.run = async (...params: Parameters<T>): Promise<void> => {
    state.isCalled = true

    state.isResolved = false
    state.isRejected = false

    state.isPending = true
    try {
      state.result = await payloadGetter(...params)
      state.isResolved = true
      state.error = null
    } catch (err) {
      console.log(err)
      state.isRejected = true
      state.error = err as E
    } finally {
      state.isPending = false
    }
  }

  return state
}
