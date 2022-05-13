<template>
  <div class="notes">
    <h1>notes list</h1>
    <div class="notes__links">
      <router-link to="/create-note" class="btn btn--colored">add note</router-link>
      <button class="btn btn--colored" type="button" @click="generateNote">generate note</button>
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
          v-if="errors.deleteNote"
          class="popup__error"
      >
        Произошла ошибка <strong>{{ errors.deleteNote.message }}</strong> при удалении заметки
        <strong>{{ titleOfTheNoteToBeDeleted }}</strong>: попробуйте повторить операцию
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
          <template v-if="errors.deleteNote">Повторить</template>
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
          <router-link
              v-if="checkPermission(PERMISSIONS.updateNote)"
              :to="{path: `/update/${note._id}/`}"
              class="btn notes__item-controls-btn _update"
          >
            update
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {mapActions, mapGetters, mapState} from 'vuex'
import {DeletionStates, PERMISSIONS} from '@/constants'
import {Note} from '@/typings'
import {useStore} from '@/store'
import {storeToRefs} from 'pinia'
import {useUser} from '@/util/useUser'

export default defineComponent({
  name: 'Notes',
  setup() {
    const main = useStore()
    const {notes} = storeToRefs(main)
    const isShowingPopup = ref(false)
    const deletionState = ref(DeletionStates.IDLE)
    const removableNoteId = ref('')
    const {user, userInfoLoader} = useUser({checkOnMount: true})

    return {
      user,
      userInfoLoader,
    }
  },
  data() {
    return {
      isShowingPopup: false,
      deletionState: DeletionStates.IDLE,
      removableNoteId: null as string | null,

      DeletionStates,
      PERMISSIONS
    }
  },
  mounted() {
    if (!this.user) {
      this.getUserInfo()
    }

    if (!(Array.isArray(this.notes) && this.notes.length > 0)) {
      this.getNotes()
    }
  },
  computed: {
    ...mapState(['user', 'errors', 'notes']),
    ...mapGetters(['checkPermission']),

    titleOfTheNoteToBeDeleted(): string | null {
      if (this.removableNoteId) {
        return this.notes.find((note: Note) => note._id === this.removableNoteId)?.title || null
      }

      return null
    }
  },
  methods: {
    ...mapActions(['getUserInfo', 'getNotes', 'createNoteRequest', 'deleteNote']),

    generateNote() {
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

      this.createNoteRequest(formData).then(() => {
        this.$nextTick(() => {
          if (!this.errors.createNote) {
            this.$router.push({path: '/notes'})
          }
        })
      })
    },
    resetDeletion() {
      this.isShowingPopup = false
      this.removableNoteId = null
      this.deletionState = DeletionStates.IDLE
    },
    openNoteConfirmation(noteId: string) {
      this.isShowingPopup = true
      this.removableNoteId = noteId
    },
    requestDeleteNote() {
      this.deletionState = DeletionStates.PREPARING

      setTimeout(() => {
        this.deleteNote(this.removableNoteId)
            .then(() => {
              this.$nextTick(() => {
                if (this.errors.deleteNote) {
                  this.deletionState = DeletionStates.IDLE

                  return
                } else {
                  this.deletionState = DeletionStates.DELETING

                  setTimeout(() => {
                    this.deletionState = DeletionStates.DONE

                    setTimeout(this.resetDeletion, 1000)
                  }, 1000)
                }
              })
            })
      }, 1000)
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