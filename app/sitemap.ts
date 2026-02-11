import type { MetadataRoute } from 'next';
import { getMeetings } from '@/lib/meetings';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://final-07-moa-release.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await getMeetings();
  const meetings = res.ok === 1 ? res.item : [];

  const meetingEntries: MetadataRoute.Sitemap = meetings.map((meeting) => ({
    url: `${SITE_URL}/meetings/${meeting._id}`,
    lastModified: new Date(meeting.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/meetings`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/map`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    ...meetingEntries,
  ];
}
