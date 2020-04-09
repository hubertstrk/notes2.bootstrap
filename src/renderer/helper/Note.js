// import {getHeadings} from '@/helper/Marked'

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
  // const headings = getHeadings(markdown)
  // return headings && headings[0] && headings[0].title.trim() !== '' ? headings[0].title : 'no title'
  return markdown.substring(0, 30)
}
