import dynamic from 'next/dynamic'

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
  return <JSONEditor />
}
