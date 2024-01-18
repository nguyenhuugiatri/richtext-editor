/// <reference types="next-images" />

declare module '*.svg?svgr' {
  import type { ReactElement, SVGProps } from 'react'

  const content: (props: SVGProps<SVGElement>) => ReactElement
  export default content
}
