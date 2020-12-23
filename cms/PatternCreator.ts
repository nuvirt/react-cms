import { MarkdownCreatorPlugin } from '../utils/plugins/MarkdownCreatorPlugin'
import { slugify, fileToUrl } from '../utils'
import moment from 'moment'

export const BlogPostCreatorPlugin = new MarkdownCreatorPlugin({
  label: 'New Blog Post',
  filename: form => {
    const slug = slugify(form.title)
    return `content/patterns/${slug}.md`
  },
  fields: [
    {
      name: 'title',
      component: 'text',
      label: 'Title',
      placeholder: 'Pattern Name',
      description: 'The name of the pattern.',
    },
    {
      label: 'Date',
      name: 'date',
      component: 'date',
      description: 'The default will be today',
    },
    {
      label: 'Author',
      description: 'Who wrote this?',
      name: 'author',
      component: 'text',
    },
  ],
  frontmatter: postInfo => ({
    title: postInfo.title,
    date: moment(postInfo.date ? postInfo.date : new Date()).format(),
    author: postInfo.author ? postInfo.author : `Jane Doe`,
  }),
  body: () => `New post, who dis?`,
  afterCreate: response => {
    let url = fileToUrl(response.content.path.split('content')[1], 'blog')

    window.location.href = `/blog/${url}`
  },
})
