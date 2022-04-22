import {reactive, Ref, ref, shallowReactive} from 'vue'
import {ApiError} from "@/typings"

export const useApiWrapper = <T extends (...args: any[]) => any>(payloadGetter: T) => useAsyncWrapper<T, ApiError>(payloadGetter)

// export const useAsyncWrapper = <P extends Array<any>, R>(payloadGetter: (...params: P) => Promise<R>) => {
export const useAsyncWrapper = <T extends (...args: any[]) => any, E extends Error>(payloadGetter: T) => {
    // let result: Ref<R | null> = ref(null)
    // let error: Ref<Error | null> = ref(null)

    let state = shallowReactive({
        isCalled: false,
        isPending: false,
        isResolved: false,
        isRejected: false,
        error: null as E | null,
        result: null as Awaited<ReturnType<T>> | null,
        run: async () => {}
    })

    state.run = async (...params: Parameters<T>): Promise<void> => {
        state.isCalled = true

        state.isResolved = false
        state.isRejected = false

        state.isPending = true
        try {
            state.result = await payloadGetter(...params)
            state.isResolved = true
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