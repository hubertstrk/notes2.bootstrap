const historyPlugin = store => {
  store.subscribeAction({
    before: (action, state) => {
      if (action.type === 'editor/setActiveNoteId') {
        console.info(`note with id ${state.editor.activeNoteId}`)
      }
    }
  })
}

export default historyPlugin
