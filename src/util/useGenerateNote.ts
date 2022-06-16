import {useStore} from '@/store'
import {useApiWrapper} from '@/util/hooks'

export const useGenerateNote = () => {
  const main = useStore()

  const generateNoteInfoLoader = useApiWrapper(() => {
    const randomTitleAndNoteStr: string = Math.random().toString().slice(2)
    const labels = ['Новости', 'Рубрика', 'Новинка', 'Флуд']
    const randomLabels = labels[Math.floor(Math.random() * labels.length)]
    const date = new Date()
    const publicationDate = date.toISOString().slice(0, 10)
    const formData = new FormData()

    formData.append('title', `${randomTitleAndNoteStr}_title`)
    formData.append('note', `${randomTitleAndNoteStr}_note`)
    formData.append('labels[]', randomLabels)
    formData.append('publication_date', publicationDate)

    // TODO
    // @ts-ignore
    return main.createNoteRequest(formData)
  })

  return {
    generateNoteInfoLoader
  }
}
