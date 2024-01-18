import { type CSSProperties, type FC, type ReactNode, useRef } from 'react'

import { cn } from '@/styles/utils'

type LayoutProps = {
  children: ReactNode
  contentClassName?: string
  full?: boolean
  maxWidth?: number
}

export const Layout: FC<LayoutProps> = ({
  children,
  contentClassName,
  full,
  maxWidth,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="h-screen">
      <div className="matcha-scroll-container">
        <div className="matcha-content-wrapper" ref={scrollRef}>
          <div
            className={cn({ 'matcha-content-inner': !full }, contentClassName)}
            style={
              typeof maxWidth === 'number'
                ? ({ '--max-screen-width': `${maxWidth}px` } as CSSProperties)
                : undefined
            }
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
