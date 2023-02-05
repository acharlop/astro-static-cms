import type CMS from '@staticcms/core'
import type { Config } from '@staticcms/core'

export type NormalizedPreviewStyle =
  | [pathOrUrl: string]
  | [rawCSS: string, meta: { raw: boolean }]

export type PreviewStyle = string | NormalizedPreviewStyle

export interface InitCmsOptions {
  cms: typeof CMS
  config: Config
  previewStyles?: NormalizedPreviewStyle[]
}
