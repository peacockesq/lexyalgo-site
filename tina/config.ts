import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.HEAD || 'main',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        label: 'Blog Posts',
        name: 'post',
        path: 'content/posts',
        format: 'md',
        fields: [
          { type: 'string', label: 'Title', name: 'title', isTitle: true, required: true },
          { type: 'datetime', label: 'Date', name: 'date', required: true },
          { type: 'string', label: 'Author', name: 'author', required: true },
          { type: 'string', label: 'Excerpt', name: 'excerpt' },
          {
            type: 'object',
            label: 'SEO',
            name: 'seo',
            fields: [
              { type: 'string', label: 'SEO Title', name: 'title' },
              { type: 'string', label: 'SEO Description', name: 'description' },
            ],
          },
          { type: 'rich-text', label: 'Body', name: 'body', isBody: true, required: true },
        ],
      },
      {
        label: 'Pages',
        name: 'page',
        path: 'content/pages',
        format: 'md',
        fields: [
          { type: 'string', label: 'Title', name: 'title', isTitle: true, required: true },
          {
            type: 'object',
            label: 'SEO',
            name: 'seo',
            fields: [
              { type: 'string', label: 'SEO Title', name: 'title' },
              { type: 'string', label: 'SEO Description', name: 'description' },
            ],
          },
          { type: 'rich-text', label: 'Body', name: 'body', isBody: true, required: true },
        ],
      },
    ],
  },
})
