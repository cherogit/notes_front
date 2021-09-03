<template>
  <div>
    <div v-if="!!errors.loadNoteById">
      <h2>{{ errors.loadNoteById.error.status }}: {{ errors.loadNoteById.error.message }}</h2>
      <br>

      <router-link class="btn btn--colored" to="/notes">notes</router-link>
    </div>

    <form
      v-else
      action=""
    >
      <label class="label">
        <div class="label__name">title</div>
        <input class="input" v-model="noteData.title" type="text" name="title">
        <span v-if="formErrors.title">Поле title {{ formErrors.title }}</span>
      </label>
      <label class="label">
        <div class="label__name">note</div>
        <input class="input" v-model="noteData.note" type="text" name="note">
        <span v-if="formErrors.note">Поле note {{ formErrors.note }}</span>
      </label>
      <label class="label">
        <select v-model="noteData.labels" name="labels[]" multiple>
          <option value="Новости">Новости</option>
          <option value="Рубрика">Рубрика</option>
          <option value="Новинка">Новинка</option>
          <option value="Флуд">Флуд</option>
        </select>
        <span v-if="formErrors.labels">Поле labels {{ formErrors.labels }}</span>
      </label>
      <label class="label">
        <div class="label__name">publication date</div>
        <input class="input" v-model="noteData.publicationDate" type="date" name="publication_date">
        <span v-if="formErrors.publicationDate">Поле publication date {{ formErrors.publicationDate }}</span>
      </label>
      <div class="btns">
        <router-link :to="'/notes/'" class="btn btn--colored">cancel</router-link>
        <button class="btn btn--colored" type="button" @click="updateNoteRequest">save</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
import {Note} from '@/typings';

export default defineComponent({
  name: 'UpdateNote',
  data() {
    return {
      noteData: {
        title: null as string | null,
        note: null as string | null,
        labels: [] as string[],
        publicationDate: null as string | null,
      }
    }
  },
  async mounted() {
    const _id = this.idOfTheUpdatableNote

    if (!_id) {
      return
    }

    this.setError({action: 'loadNoteById', error: null})

    let note = this.noteById(_id)

    if (!note) {
      await this.loadNoteById(_id)
      note = this.noteById(_id)
    }

    this.noteData = note
  },
  computed: {
    ...mapState(['errors']),
    ...mapGetters(['noteById']),
    idOfTheUpdatableNote(): string | null {
      let id = this.$route.params?.id

      if (Array.isArray(id)) {
        id = id[0]
      }

      return id || null
    },
    formErrors() {
      const errors = {
        title: null,
        note: null,
        labels: null,
        publicationDate: null
      }

      const errorsArr = this.errors.updateNote?.errors

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
    ...mapMutations(['setError']),
    ...mapActions(['loadNoteById', 'updateNote']),
    updateNoteRequest() {
      if (!this.idOfTheUpdatableNote) {
        return
      }
      const formData = new FormData()

      formData.append('title', this.noteData.title || '')
      formData.append('note', this.noteData.note || '')
      formData.append('labels[]', this.noteData.labels.join(',') || '')
      formData.append('publication_date', this.noteData.publicationDate || '')

      this.updateNote([this.idOfTheUpdatableNote, formData]).then(() => {
        console.log(this.errors.updateNote)
        this.$nextTick(() => {
          if (!this.errors.updateNote) {
            this.$router.push({path: '/notes'})
          }
        })
      })
    }
  }
})
</script>

<style lang="less">
.btns {
  display: flex;

  .btn:not(:last-child) {
    margin-right: 24px;
  }
}
</style>