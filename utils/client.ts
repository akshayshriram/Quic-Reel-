import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'xj1hujzg',
  dataset: 'production',
  apiVersion: '2024-05-10',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
