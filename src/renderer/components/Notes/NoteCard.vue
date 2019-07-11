<template>
  <div class="note-card">
    <div class="card-row-upper">
      <div class="card-title">{{title}}</div>
      <div class="card-icon">
        <font-awesome-icon icon="bookmark" />
      </div>
    </div>
    <div class="card-row-lower">
      <b-badge variant="success">success</b-badge>
      <b-badge variant="danger">danger</b-badge>
      <b-badge variant="info">info</b-badge>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NoteCard',
    props: ['title']
  }
</script>

<style lang="scss" scoped>
.note-card {

  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;

  .card-row-upper {

    display: flex;
    justify-content: space-between;

    .card-title {
      font-size: 1.3em;
    }

    .card-icon {

      display: flex;
      align-items: center;
      justify-content: center;

    }
  }

  .card-row-lower {

    display: flex;

    > * {
      margin-right: 4px;
    }
  }
}
</style>