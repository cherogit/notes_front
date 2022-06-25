<template>
  <div class="note">
    note {{ note }}
<!--    <div class="note__title">{{ noteData.title }}</div>-->
<!--    <div class="note__body">-->
<!--      <div>{{ noteData.note }}</div>-->
<!--      <div>{{ noteData.labels[0] }}</div>-->
<!--      <div>{{ noteData.publication_date }}</div>-->
<!--    </div>-->
    <div class="note__controls">
<!--      <button-->
<!--        class="btn notes__item-controls-btn _delete"-->
<!--        type="button"-->
<!--        @click="openNoteConfirmation(note._id)"-->
<!--      >-->
<!--        delete-->
<!--      </button>-->
<!--      <router-link-->
<!--        :to="{path: `/update/${noteData._id}/`}"-->
<!--        class="btn note__controls-btn _update"-->
<!--      >-->
<!--        update-->
<!--      </router-link>-->
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useGetNotes} from '@/util/useGetNotes'
import {useNote} from '@/util/useNote'

export default defineComponent({
  name: 'Note',
  setup() {
    useGetNotes()
    const {note, noteInfoLoader} = useNote()

    console.log(333, note)

    return {
      note,
      noteInfoLoader,
    }
  }
});
</script>
