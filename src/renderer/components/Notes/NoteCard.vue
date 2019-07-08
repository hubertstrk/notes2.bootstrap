<template>
  <div class="note-card">
    {{note.title}}
  </div>
</template>

<script>
  export default {
    name: 'NoteCard',
    props: ['note']
  }
</script>

<style lang="scss" scoped>
.note-card {
  height: 50px;
  width: 100%;
  padding: 4px;
}
</style>