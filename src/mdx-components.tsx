import defaultMdxComponents from 'fumadocs-ui/mdx'
import { Callout } from 'fumadocs-ui/components/callout'
import { ImageZoom } from 'fumadocs-ui/components/image-zoom'
import type { MDXComponents } from 'mdx/types'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Callout,
    img: (props) => <ImageZoom {...props} />,
    ...components,
  }
}
