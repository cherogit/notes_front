import {storeToRefs} from 'pinia'
import {useStore} from '@/store'
import {useApiWrapper} from '@/util/hooks'
import {onMounted} from 'vue'

export const useGetNotes = () => {
  const main = useStore()
  const {notes} = storeToRefs(main)
  const notesInfoLoader = useApiWrapper(main.getNotes)

  onMounted(async () => {
    if (!(Array.isArray(notes) && notes.value.length)) {
      await notesInfoLoader.run()
    }
  })

  return {
    notes,
    notesInfoLoader,
  }
}
