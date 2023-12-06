// lib/client.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

//creates connection to sanity cms
export const client = createClient({
    projectId: 'ry4c3w9f',
    dataset: 'production',
    apiVersion: 'v2022-03-07',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
  });
  
  const builder = imageUrlBuilder(client);

  export const urlFor = (source: string) => builder.image(source);