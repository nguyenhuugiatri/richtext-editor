/* eslint-disable import/no-mutable-exports */
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export type TSiteMetadata = {
  name: string
  url: string
  description: string
}

export type TSiteConfig = {
  metadata: TSiteMetadata
}

export const { MODE = '' } = publicRuntimeConfig

export let siteConfig: TSiteConfig

switch (MODE) {
  case 'dev': {
    siteConfig = {
      metadata: {
        name: 'Mavis Store',
        url: 'https://store.skymavis.one',
        description: `Mavis Store is the go-to place for your gaming gear needs. We're on a mission to revolutionize the way you experience in-game purchases, making it seamless, secure, and accessible to everyone.`,
      },
    }
    break
  }

  default: {
    siteConfig = {
      metadata: {
        name: 'Mavis Store',
        url: 'https://store.skymavis.com',
        description: `Mavis Store is the go-to place for your gaming gear needs. We're on a mission to revolutionize the way you experience in-game purchases, making it seamless, secure, and accessible to everyone.`,
      },
    }
  }
}
