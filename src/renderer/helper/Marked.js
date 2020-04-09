import { Remarkable } from 'remarkable'
import hljs from 'highlight.js'

var md = new Remarkable({
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
  }
})

md = new Remarkable('full', {
  html: true,
  typographer: true
})

export const getHtml = (markdown) => {
  return md.render(markdown)
}
