import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { config } from '@/lib/config'

export const adminClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: config.sanity.adminApiToken // Set to false if statically generating pages, using ISR or tag-based revalidation
})
