/* eslint-disable react/jsx-no-useless-fragment */
import uniqueId from 'lodash.uniqueid'
import NextLink from 'next/link'
import type { CSSProperties } from 'react'

import { cn } from '@/styles/utils'

const WHITELISTED_DOMAIN_ARRAY = ['playwildforest.io']
const WHITELISTED_CSS = [
  'width',
  'maxWidth',
  'minWidth',
  'height',
  'minHeight',
  'maxHeight',
  'fontSize',
  'fontWeight',
  'color',
  'backgroundColor',
  'textDecoration',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'display',
  'flexDirection',
  'justifyContent',
  'alignItems',
  'gridTemplateColumns',
  'gridTemplateRows',
  'gap',
  'rowGap',
  'columnGap',
  'borderRadius',
  'border',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'objectFit',
] as const

type WhitelistedCSSProperties = Pick<
  CSSProperties,
  (typeof WHITELISTED_CSS)[number]
>

type ElementProps = WhitelistedCSSProperties & {
  className?: string
}

type Words = ElementProps & {
  type: 'words'
  value: string
}

type Link = ElementProps & {
  type: 'link'
  value: string
  href: string
}

type Text = string | Link | Words | Paraph

type Texts = Text | Text[]

type Paraph = ElementProps & {
  type: 'paraph'
  value: Texts
}

type Image = ElementProps & {
  type: 'image'
  value: string
  description?: string
}

type Row = ElementProps & {
  type: 'row'
  gap?: number
  value: Content | Content[]
}

type Col = ElementProps & {
  type: 'col'
  gap?: number
  value: Content | Content[]
}

type Card = ElementProps & {
  type: 'card'
  image: string | Image
  title: Texts
  subtitle: Texts
  description: Texts
  postDescription: Texts
}

type Content = Texts | Image | Row | Col | Card

export const supportedGaps =
  'space-x-2 space-x-4 space-x-8 space-x-12 space-x-16 space-x-24 space-x-32 space-y-2 space-y-4 space-y-8 space-y-12 space-y-16 space-y-24 space-y-32'

const filterCSS = (css: CSSProperties) => {
  return Object.keys(css).reduce<WhitelistedCSSProperties>(
    (acc: WhitelistedCSSProperties, key: string) => {
      if (WHITELISTED_CSS.includes(key as (typeof WHITELISTED_CSS)[number])) {
        const value = css[key as keyof CSSProperties]
        return {
          ...acc,
          [key]: value,
        }
      }
      return acc
    },
    {}
  )
}

export function convertToJSX(input: Content | Content[]): React.ReactNode {
  const generateKey = (): string => uniqueId()

  if (typeof input === 'string') return <span key={generateKey()}>{input}</span>

  if (Array.isArray(input)) return input.map((item) => convertToJSX(item))

  if (!input || !input.type) return null

  const { type, className, ...css } = input
  const filteredCSS = filterCSS(css)

  switch (type) {
    case 'words': {
      return (
        <>
          <span key={generateKey()} className={className} style={filteredCSS}>
            {input.value}
          </span>{' '}
        </>
      )
    }

    case 'link': {
      if (!input.href) return null

      const isWhitelistedDomain = () => {
        try {
          const { hostname } = new URL(input.href)
          const latestDomain = hostname.split('.').slice(-2).join('.')
          const isSkyMavisDomain = [
            'skymavis.com',
            'axieinfinity.com',
          ].includes(latestDomain)
          const isWhitelistedExternalDomain =
            WHITELISTED_DOMAIN_ARRAY.includes(latestDomain)
          return isSkyMavisDomain || isWhitelistedExternalDomain
        } catch {
          return false
        }
      }

      if (!isWhitelistedDomain()) return null

      return (
        <>
          <NextLink
            key={generateKey()}
            className={cn(
              'text-body-s text-text-color-highlight underline sm:text-body-m',
              className
            )}
            target="_blank"
            href={input.href}
            style={filteredCSS}
          >
            {input.value}
          </NextLink>{' '}
        </>
      )
    }

    case 'paraph': {
      return (
        <p
          className={cn('text-body-s sm:text-body-m', className)}
          key={generateKey()}
          style={filteredCSS}
        >
          {convertToJSX(input.value)}
        </p>
      )
    }

    case 'image': {
      return (
        <div
          key={generateKey()}
          className={cn(
            'flex w-full shrink-0 flex-col items-center',
            className
          )}
          style={filteredCSS}
        >
          <img
            src={input.value}
            className="h-full w-full rounded-12 object-cover"
          />
          {input.description && (
            <span className="mt-8 text-body-s text-text-color-subdued">
              {input.description}
            </span>
          )}
        </div>
      )
    }

    case 'row': {
      const { gap } = input

      return (
        <div
          key={generateKey()}
          className={cn(
            'flex w-full',
            {
              [`space-x-${gap}`]: gap,
            },
            className
          )}
          style={filteredCSS}
        >
          {convertToJSX(input.value)}
        </div>
      )
    }

    case 'col': {
      const { gap } = input

      return (
        <div
          key={generateKey()}
          className={cn(
            'flex flex-col',
            {
              [`space-y-${gap}`]: gap,
            },
            className
          )}
          style={filteredCSS}
        >
          {convertToJSX(input.value)}
        </div>
      )
    }
    case 'card':
      return (
        <div
          key={generateKey()}
          className="flex flex-col space-y-8 lg:flex-row lg:items-center lg:space-x-16 lg:space-y-0"
        >
          {typeof input.image === 'string'
            ? convertToJSX({
                type: 'image',
                width: 260,
                objectFit: 'cover',
                value: input.image,
              })
            : convertToJSX(input.image)}
          <div className="flex flex-col">
            {typeof input.title === 'string'
              ? convertToJSX({
                  type: 'words',
                  className:
                    'mb-4 lg:mb-12 text-h6 sm:text-h4 text-text-color-default',
                  value: input.title,
                })
              : convertToJSX({
                  type: 'paraph',
                  className:
                    'mb-4 lg:mb-12 text-h6 sm:text-h4 text-text-color-default',
                  value: input.title,
                })}
            <div className="flex flex-col space-y-8">
              {input.subtitle && (
                <>
                  {typeof input.subtitle === 'string'
                    ? convertToJSX({
                        type: 'words',
                        className: 'text-body-s sm:text-body-m',
                        value: input.subtitle,
                      })
                    : convertToJSX({
                        type: 'paraph',
                        className: 'text-body-s sm:text-body-m',
                        value: input.subtitle,
                      })}
                </>
              )}
              {input.description && (
                <div>{convertToJSX(input.description)}</div>
              )}
              {input.postDescription && (
                <div>{convertToJSX(input.postDescription)}</div>
              )}
            </div>
          </div>
        </div>
      )

    default:
      return null
  }
}

export const JSONToJSX = (json: string) => {
  try {
    const object = JSON.parse(json)
    return (
      <div className="flex flex-col space-y-32 text-body-s text-text-color-subdued sm:text-body-m">
        {convertToJSX(object)}
      </div>
    )
  } catch {
    return json
  }
}
