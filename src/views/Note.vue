<template>
  <div class="note">
    <div class="note__title">{{ noteData.title }}</div>
    <div class="note__body">
      <div>{{ noteData.note }}</div>
      <div>{{ noteData.labels[0] }}</div>
      <div>{{ noteData.publication_date }}</div>
    </div>
    <div class="note__controls">
<!--      <button-->
<!--        class="btn notes__item-controls-btn _delete"-->
<!--        type="button"-->
<!--        @click="openNoteConfirmation(note._id)"-->
<!--      >-->
<!--        delete-->
<!--      </button>-->
      <router-link
        :to="{path: `/update/${noteData._id}/`}"
        class="btn note__controls-btn _update"
      >
        update
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

export default defineComponent({
  name: 'Note',
  data() {
    return {
      noteData: {
        _id: null as string | null,
        title: null as string | null,
        note: null as string | null,
        labels: [] as string[],
        publicationDate: null as string | null,
      }
    }
  },
  async mounted() {
    const _id = this.idOfTheNote

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
    idOfTheNote(): string | null {
      let id = this.$route.params?.id

      if (Array.isArray(id)) {
        id = id[0]
      }

      return id || null
    },
  },
  methods: {
    ...mapMutations(['setError']),
    ...mapActions(['loadNoteById']),
  },
});
</script>