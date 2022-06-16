<template>
  <div class="notes">
    <h1>notes list</h1>
    <div class="notes__links">
      <router-link to="/create-note" class="btn btn--colored">add note</router-link>
      <button class="btn btn--colored" type="button" @click="generateNoteInfoLoader.run">generate note</button>
    </div>

    <div
      v-if="isShowingPopup"
      class="popup"
    >
      <h3
        v-if="titleOfTheNoteToBeDeleted"
        class="popup__title"
      >
        Вы точно хотите удалить заметку {{ titleOfTheNoteToBeDeleted }}?
      </h3>

      <h5
        v-if="deletionState !== DeletionStates.IDLE"
        class="popup__status"
      >
        <template v-if="deletionState === DeletionStates.PREPARING">
          Подождите...
        </template>
        <template v-if="deletionState === DeletionStates.DELETING">
          Удаляю...
        </template>
        <template v-if="deletionState === DeletionStates.DONE">
          Успешно удалено
        </template>
      </h5>
      <h5
        v-if="deleteNoteInfoLoader.isRejected && deleteNoteInfoLoader.error"
        class="popup__error"
      >
        Произошла ошибка <strong>{{ deleteNoteInfoLoader.error.message }}</strong> <br>
        при удалении заметки
        <strong>{{ titleOfTheNoteToBeDeleted }}</strong>: <br>попробуйте повторить операцию
      </h5>

      <div
        v-if="deletionState !== DeletionStates.DONE"
        class="popup__btns"
      >
        <button
          class="btn btn--success"
          type="button"
          :disabled="deletionState !== DeletionStates.IDLE"
          @click="resetDeletion"
        >
          Отменить
        </button>
        <button
          class="btn btn--warn"
          type="button"
          :disabled="deletionState !== DeletionStates.IDLE"
          @click="requestDeleteNote"
        >
          <template v-if="deleteNoteInfoLoader.isRejected && deleteNoteInfoLoader.error">Повторить</template>
          <template v-else>Да, хочу удалить</template>
        </button>
      </div>
    </div>

    <ul class="notes__list">
      <li
        v-for="(note, ndx) of notes"
        :key="ndx"
        class="notes__item"
      >
        <div class="notes__item-title">{{ note.title }}</div>
        <div class="notes__item-controls">
          <router-link
            :to="{path: `/note/${note._id}/`}"
            class="btn notes__item-controls-btn _more"
          >
            more
          </router-link>
          <button
            class="btn notes__item-controls-btn _delete"
            type="button"
            @click="openNoteConfirmation(note._id)"
          >
            delete
          </button>
          <!--          <router-link-->
          <!--              v-if="checkPermission(PERMISSIONS.updateNote)"-->
          <!--              :to="{path: `/update/${note._id}/`}"-->
          <!--              class="btn notes__item-controls-btn _update"-->
          <!--          >-->
          <!--            update-->
          <!--          </router-link>-->
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, nextTick, onMounted, ref} from 'vue'
import {DeletionStates, PERMISSIONS} from '@/constants'
import {Note} from '@/typings'
import {useStore} from '@/store'
import {storeToRefs} from 'pinia'
import {useUser} from '@/util/useUser'
import {useApiWrapper} from '@/util/hooks'
import {useGenerateNote} from '@/util/useGenerateNote'

export default defineComponent({
  name: 'Notes',
  setup() {
    const main = useStore()
    const {notes} = storeToRefs(main)
    let isShowingPopup = ref(false)
    let removableNoteId = ref<string>('')
    const deletionState = ref(DeletionStates.IDLE)
    const {user, userInfoLoader} = useUser({checkOnMount: true})
    const {generateNoteInfoLoader} = useGenerateNote()

    const notesInfoLoader = useApiWrapper(main.getNotes)

    onMounted(async () => {
      if (!(Array.isArray(notes) && notes.value.length)) {
        await notesInfoLoader.run()
      }
    })

    const titleOfTheNoteToBeDeleted = computed<string | null>(() => {
      if (removableNoteId) {
        return notes.value.find((note: Note) => note._id === removableNoteId.value)?.title || null
      }

      return null
    })

    const openNoteConfirmation = (noteId: string) => {
      isShowingPopup.value = true
      removableNoteId.value = noteId
    }

    const resetDeletion = () => {
      console.log(1)
      isShowingPopup.value = false
      removableNoteId.value = ''
      deletionState.value = DeletionStates.IDLE
    }

    const deleteNoteInfoLoader = useApiWrapper(() => main.deleteNote(removableNoteId.value))
    const requestDeleteNote = () => {
      deletionState.value = DeletionStates.PREPARING

      setTimeout(() => {
        deleteNoteInfoLoader
          .run()
          .then(() => {
            nextTick(() => {
              if (deleteNoteInfoLoader.error) {
                deletionState.value = DeletionStates.IDLE
                return
              } else {
                deletionState.value = DeletionStates.DELETING

                setTimeout(() => {
                  deletionState.value = DeletionStates.DONE
                  setTimeout(resetDeletion, 1000)
                }, 1000)
              }
            })
          })
      }, 1000)
    }

    return {
      user,
      userInfoLoader,
      notes,
      isShowingPopup,
      DeletionStates,
      deletionState,
      removableNoteId,
      titleOfTheNoteToBeDeleted,
      PERMISSIONS,

      generateNoteInfoLoader,
      resetDeletion,
      openNoteConfirmation,
      requestDeleteNote,
      deleteNoteInfoLoader
    }
  }
})
</script>

<style lang="less">
.popup {
  max-width: 600px;
  margin: 50px 0;
  padding: 24px 40px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, .1);

  &__title {
    margin-bottom: 40px;
  }

  &__status {
    text-align: center;
    margin-bottom: 40px;
  }

  &__error {
    margin-bottom: 40px;
    color: tomato;

    strong {
      text-decoration: underline;
    }
  }

  &__btns {
    display: flex;
    justify-content: space-between;

    .btn {
      color: white;
    }
  }
}

.notes__links {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.notes__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
  list-style: none;
}

.notes__item {
  padding: 12px 24px;
  font-size: 20px;
  color: #282828;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, .1);
  transition: .2s;

  &:hover {
    box-shadow: 0 1px 20px 0 rgba(0, 0, 0, .2);
  }
}

.notes__item-link {
  display: block;
  text-decoration: none;
}

.notes__item-title {
  margin-bottom: 25px;
  font-size: 32px;
}

.notes__item-body {
  font-size: 24px;
}

.notes__item-controls {
  display: flex;
  margin-top: 48px;
}

.notes__item-controls-btn {
  text-decoration: none;
  color: inherit;
  background-color: transparent;
  margin-right: 20px;
  padding: 10px 25px;
  font-size: 14px;
  border: 0;
  outline: none;
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, .2);
  cursor: pointer;
  transition: .2s;
}

.notes__item-controls-btn._more:hover {
  background-color: #282828;
  color: whitesmoke;
}

.notes__item-controls-btn._update:hover {
  background-color: #97dbf3;
  color: whitesmoke;
}

.notes__item-controls-btn._delete:hover {
  background-color: #ca0202;
  color: whitesmoke;
}
</style>
