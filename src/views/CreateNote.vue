<template>
  <form action="">
    <label class="label">
      <div class="label__name">title</div>
      <input class="input" v-model="title" type="text" name="title">
    </label>
    <label class="label">
      <div class="label__name">note</div>
      <input class="input" v-model="note" type="text" name="note">
    </label>
    <label class="label">
      <select v-model="labels" name="labels[]" multiple>
        <option value="Новости">Новости</option>
        <option value="Рубрика">Рубрика</option>
        <option value="Новинка">Новинка</option>
        <option value="Флуд">Флуд</option>
      </select>
    </label>
    <label class="label">
      <div class="label__name">publication date</div>
      <input class="input" v-model="publicationDate" type="date" name="publication_date">
    </label>
    <button class="btn btn--colored" type="button" @click="createNote">join</button>
  </form>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapState, mapActions} from 'vuex'

export default defineComponent({
  name: 'CreateNote',
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