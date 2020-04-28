import {getHeadings} from '@/helper/Marked'

const props = ['starred', 'archived', 'text', 'project']

export const noteEquals = (a, b) => {
  for (var i = 0; i < props.length; i++) {
    if (a[props[i]] !== b[props[i]]) {
      return false
    }
  }
  return true
}

export const getTitle = (markdown) => {
  const headings = getHeadings(markdown).filter(x => x.lvl <= 3)
  return headings && headings.length && headings.length > 0 ? headings[0].content : 'no title'
}
