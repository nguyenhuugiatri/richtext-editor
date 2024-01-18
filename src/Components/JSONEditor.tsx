// @ts-nocheck

import 'brace'
import 'brace/mode/json'
import 'brace/theme/dracula'

import dynamic from 'next/dynamic'
import { useState } from 'react'

import wfData from '@/data/wf.json'
import { JSONToJSX } from '@/libs/richtext-parser'

const JsonEditor = dynamic(
  {
    loader: () => import('nextjs-jsoneditor').then((mod) => mod.JsonEditor),
  },
  {
    ssr: false,
  }
)

export const JSONEditor = () => {
  const [json, setJson] = useState(wfData)

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden sm:flex-row">
      <div className="sm:w-2/5 [&>div>div]:h-full [&>div]:h-full">
        <JsonEditor
          mode="code"
          theme="ace/theme/dracula"
          value={json}
          onChange={setJson}
        />
      </div>
      <div className="overflow-auto p-24 sm:w-3/5">
        {JSONToJSX(JSON.stringify(json))}
      </div>
    </div>
  )
}
