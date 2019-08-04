const props = ['starred', 'archived', 'text', 'project']

export const noteEquals = (a, b) => {
  for (var i = 0; i < props.length; i++) {
    if (a[props[i]] !== b[props[i]]) {
      return false
    }
  }
  return true
}
