export function buildMeta({ title, description, urlPath, thumbPath, customTags }) {
  // console.log({ title, description, urlPath, thumbPath, customTags })
  const path = urlPath || document.location.pathname
  const _thumbPath = thumbPath || '/assets/images/pages/home/home-thumb.jpg'
  return {
    title: { inner: 'Zumi', complement: title },
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: 'https://zumi.com.br' + path },
      { property: 'og:image', content: 'https://zumi.com.br' + _thumbPath },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@Zumi' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: 'https://zumi.com.br' + _thumbPath },
      ...(customTags || [])
    ]
  }
}
