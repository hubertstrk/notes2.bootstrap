import marked from 'marked'

var renderer = new marked.Renderer()

let headings = []

renderer.heading = function (text, level) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
  headings.push({title: text, level})
  return `
    <h${level} id="${escapedText}">
      ${text}
    </h${level}>`
}

marked.setOptions({
  renderer,
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

export const getHeadings = (markdown) => {
  headings = []
  marked(markdown, {})
  return headings
}

export const getHtml = (markdown) => {
  return marked(markdown, {})
}
