import dynamic from 'next/dynamic'

import { Layout } from '@/Components/Layout'

const JSONEditor = dynamic(
  {
    loader: () =>
      import('../Components/JSONEditor').then((mod) => mod.JSONEditor),
  },
  {
    ssr: false,
  }
)

export default function TestPage() {
  return (
    <Layout full>
      <JSONEditor />
    </Layout>
  )
}
