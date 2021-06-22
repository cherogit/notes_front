<template>
  <div class="notes">
    <h1>notes list</h1>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapState, mapActions} from 'vuex'

export default defineComponent({
  name: 'Notes',
  data() {
    return {}
  },
  mounted() {
    if (!this.notes) {
      this.getNotes()
    }

    console.log('notes', this.notes)
  },
  computed: {
    ...mapState(['notes'])
  },
  methods: {
    ...mapActions(['getNotes']),
  }
})
</script>

<style lang="less">

.notes {
  list-style: none;
}

.notes__item {
  margin-bottom: 50px;
  padding: 25px 50px;
  font-size: 20px;
  color: #282828;
  background-color: white;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, .1);
  transition: .2s;
}

.notes__item:hover {
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, .2);
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

.notes__item-controls-btn._update:hover {
  background-color: #97dbf3;
  color: whitesmoke;
}

.notes__item-controls-btn._delete:hover {
  background-color: #ca0202;
  color: whitesmoke;
}
</style>