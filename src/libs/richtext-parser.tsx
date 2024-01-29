/* eslint-disable react/jsx-no-useless-fragment */
import uniqueId from 'lodash.uniqueid'
import NextLink from 'next/link'
import type { CSSProperties } from 'react'

import { cn } from '@/styles/utils'

type ElementProps = CSSProperties & {
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
  'space-x-4 space-x-8 space-x-12 space-x-16 space-x-24 space-x-32 space-y-4 space-y-8 space-y-12 space-y-16 space-y-24 space-y-32'

export function convertToJSX(input: Content | Content[]): React.ReactNode {
  const generateKey = (): string => uniqueId()

  if (typeof input === 'string') return <span key={generateKey()}>{input}</span>

  if (Array.isArray(input)) return input.map((item) => convertToJSX(item))

  if (!input || !input.type) return null

  const { type, className, ...css } = input

  switch (type) {
    case 'words':
      return (
        <>
          <span key={generateKey()} className={className} style={css}>
            {input.value}
          </span>{' '}
        </>
      )

    case 'link':
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
            style={css}
          >
            {input.value}
          </NextLink>{' '}
        </>
      )

    case 'paraph':
      return (
        <p
          className={cn('text-body-s sm:text-body-m', className)}
          key={generateKey()}
          style={css}
        >
          {convertToJSX(input.value)}
        </p>
      )

    case 'image': {
      return (
        <div
          key={generateKey()}
          className={cn(
            'flex w-full shrink-0 flex-col items-center',
            className
          )}
          style={css}
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
      const { gap, ...rest } = css

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
          style={rest}
        >
          {convertToJSX(input.value)}
        </div>
      )
    }

    case 'col': {
      const { gap, ...rest } = css

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
          style={rest}
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
                width: 240,
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
