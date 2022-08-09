import {useStore} from '@/store'
import {useApiWrapper} from '@/util/hooks'
import {computed, onMounted, reactive, ref} from 'vue'
import {useRoute} from 'vue-router'
import {Note} from '@/typings'

export const useNote = () => {
  const main = useStore()
  // let noteData = ref({
  //   _id: null as string | null,
  //   title: null as string | null,
  //   note: null as string | null,
  //   labels: [] as string[],
  //   publicationDate: null as string | null,
  // })
  let noteData = ref<Note | null>({
    _id: '',
    title: '',
    note: '',
    labels: [],
    publication_date: '',
  })
  const getNoteById = main.getNoteById
  const route = useRoute()
  let _id = ref('')
  const noteInfoLoader = useApiWrapper(() => main.loadNoteById(_id.value))

  onMounted(async () => {
    const idOfTheNote = computed<string>(() => {
      let id = route.params?.id

      if (Array.isArray(id))
        id = id[0]

      return id || ''
    })

    _id = idOfTheNote
    if (!_id.value) {
      return
    }

    noteData.value = getNoteById(_id.value)

    if (!noteData.value) {
      await noteInfoLoader.run()
      noteData.value = getNoteById(_id.value)
    }
  })

  return {
    noteData,
    noteInfoLoader,
  }
}
