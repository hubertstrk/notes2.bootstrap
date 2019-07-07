<template>
  <div class="note-card">{{note.title}}</div>
</template>

<script>
  export default {
    name: 'NoteCard',
    props: ['note']
  }
</script>

<style lang="scss" scoped>
.note-card {
  padding: 4px;
}
</style>