import type { MetadataRoute } from 'next'

const routes = ['', 'capabilities', 'services/design-cad', 'services/engineering-drawings', 'services/machining', 'services/rapid-prototyping']

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ddl.arjunlabscom.com'
  const lastModified = new Date()

  return routes.map((route, index) => ({
    url: `${siteUrl}/${route}`.replace(/\/$/, '') || siteUrl,
    lastModified,
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : 0.7,
  }))
}

