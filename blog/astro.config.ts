import { defineConfig } from 'astro/config';

import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import spectre from './package/src';

import node from '@astrojs/node';
import { spectreDark } from './src/ec-theme';

import fauxRemarkEmbedder from '@remark-embedder/core'
import fauxOembedTransformer from '@remark-embedder/transformer-oembed'

// @ts-expect-error: `remarkEmbedder` types are wrong
const remarkEmbedder = fauxRemarkEmbedder.default
// @ts-expect-error: `fauxOembedTransformer` types are wrong
const oembedTransformer = fauxOembedTransformer.default

// https://astro.build/config
export default defineConfig({
  site: 'https://33j33.github.io',
  output: 'static',
  integrations: [
    expressiveCode({
      themes: [spectreDark],
    }),
    mdx({
      remarkPlugins: [
        [
          remarkEmbedder,
          {transformers: [oembedTransformer]}
        ]
      ]
    }),
    sitemap(),
    spectre({
      name: 'Ornithopter',
      openGraph: {
        home: {
          title: 'Ornithopter',
          description: 'About the author of Ornithopter'
        },
        blog: {
          title: 'Blog',
          description: 'Tech News and Guides at Ornithopter'
        },
        projects: {
          title: 'Projects',
          description: "Some interesting software builds" 
        }
      },
      // giscus: {
      //   repository: 'louisescher/spectre',
      //   repositoryId: 'R_kgDONjm3ig',
      //   category: 'General',
      //   categoryId: 'DIC_kwDONjm3is4ClmBF',
      //   mapping: 'pathname',
      //   strict: true,
      //   reactionsEnabled: true,
      //   emitMetadata: false,
      //   lang: 'en',
      // }
    })
  ],
  adapter: node({
    mode: 'standalone'
  })
});