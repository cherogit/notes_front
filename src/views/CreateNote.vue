<template>
  <form action="">
    <label class="label">
      <div class="label__name">title*</div>
      <input class="input" v-model="title" type="text" name="title">
      <span v-if="formErrors.title">Поле title {{ formErrors.title }}</span>
    </label>
    <label class="label">
      <div class="label__name">note</div>
      <input class="input" v-model="note" type="text" name="note">
      <span v-if="formErrors.note">Поле note {{ formErrors.note }}</span>
    </label>
    <label class="label">
      <select v-model="labels" name="labels[]" multiple>
        <option value="Новости">Новости</option>
        <option value="Рубрика">Рубрика</option>
        <option value="Новинка">Новинка</option>
        <option value="Флуд">Флуд</option>
      </select>
      <span v-if="formErrors.labels">Поле labels {{ formErrors.labels }}</span>
    </label>
    <label class="label">
      <div class="label__name">publication date*</div>
      <input class="input" v-model="publicationDate" type="date" name="publication_date">
      <span v-if="formErrors.publicationDate">Поле publication date {{ formErrors.publicationDate }}</span>
    </label>
    <button class="btn btn--colored" type="button" @click="createNote">join</button>
  </form>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapState, mapActions} from 'vuex'

export default defineComponent({
  name: 'CreateNote',
  setup() {

    return {}
  },
  data() {
    return {
      title: '',
      note: '',
      labels: '',
      publicationDate: '',
    }
  },
  computed: {
    ...mapState([
      'errors'
    ]),
    formErrors() {
      const errors = {
        title: null,
        note: null,
        labels: null,
        publicationDate: null
      }

      const errorsArr = this.errors.createNote?.errors

      if (Array.isArray(errorsArr)) {
        const titleError = errorsArr.find(err => err.instancePath.startsWith('/title'))

        if (titleError) {
          errors.title = titleError.message
        }

        const noteError = errorsArr.find(err => err.instancePath.startsWith('/note'))

        if (noteError) {
          errors.note = noteError.message
        }

        const labelsError = errorsArr.find(err => err.instancePath.startsWith('/labels'))

        if (labelsError) {
          errors.labels = labelsError.message
        }

        const publicationDate = errorsArr.find(err => err.instancePath.startsWith('/publication_date'))

        if (publicationDate) {
          errors.publicationDate = publicationDate.message
        }
      }

      return errors
    }
  },
  methods: {
    ...mapActions(['createNoteRequest']),
    createNote() {
      const formData = new FormData()

      formData.append('title', this.title)
      formData.append('note', this.note)
      formData.append('labels[]', this.labels)
      formData.append('publication_date', this.publicationDate)

      this.createNoteRequest(formData).then(() => {
        this.$nextTick(() => {
          if (!this.errors.createNote) {
            this.$router.push({path: '/notes'})
          }
        })
      })
    }
  }
})
</script>