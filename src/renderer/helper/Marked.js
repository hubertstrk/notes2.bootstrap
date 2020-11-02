import { Remarkable } from 'remarkable'
import toc from 'markdown-toc'
import hljs from 'highlight.js'
import emoji from 'remarkable-emoji'

const options = {
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value
    } catch (err) {}

    return '' // use external default escaping
  },
  html: true,
  typographer: true
}

function render (str, options) {
  return new Remarkable(options)
    .use(emoji)
    .render(str)
}

export const getHeadings = (markdown) => {
  const headings = toc(markdown).json
  return headings
}

export const getHtml = (markdown) => {
  const rendered = render(markdown, options)
  return rendered
}
