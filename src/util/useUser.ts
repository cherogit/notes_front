import {useStore} from '@/store'
import {storeToRefs} from 'pinia'
import {useApiWrapper} from '@/util/hooks'
import {onMounted} from 'vue'

export const useUser = (options: { checkOnMount: boolean }) => {
    const main = useStore()
    const {user} = storeToRefs(main)
    const userInfoLoader = useApiWrapper(main.getUserInfo)

    if (options.checkOnMount) {
        onMounted(async () => {
            if (!user.value) {
                await userInfoLoader.run()
            }
        })
    }

    return {
        user,
        userInfoLoader
    }
}