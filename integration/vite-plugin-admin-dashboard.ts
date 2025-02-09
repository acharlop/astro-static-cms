import type { Config } from '@staticcms/core'
import type { Plugin } from 'vite'
import type { PreviewStyle } from './types'

const virtualModuleId = 'virtual:astro-static-cms/user-config'
const resolvedVirtualModuleId = '\0' + virtualModuleId

function generateVirtualConfigModule({
  config,
  previewStyles = [],
  identityWidget,
}: {
  config: Config
  previewStyles: Array<string | [string] | [string, { raw: boolean }]>
  identityWidget: string
}) {
  const imports: string[] = []
  const styles: string[] = []

  previewStyles.forEach((entry, index) => {
    if (!Array.isArray(entry)) entry = [entry]
    const [style, opts] = entry
    if (opts?.raw || style.startsWith('http')) {
      styles.push(JSON.stringify([style, opts]))
    } else {
      const name = `style__${index}`
      imports.push(`import ${name} from '${style}?raw';`)
      styles.push(`[${name}, { raw: true }]`)
    }
  })

  return `${imports.join('\n')}
import * as StaticCMS from '@staticcms/app';
${identityWidget}
export default {
  cms: StaticCMS,
  config: JSON.parse('${JSON.stringify(config)}'),
  previewStyles: [${styles.join(',')}],
};
`
}

export default function AdminDashboardPlugin({
  config,
  previewStyles,
  identityWidget,
}: {
  config: Omit<Config, 'load_config_file' | 'local_backend'>
  previewStyles: PreviewStyle[]
  identityWidget: string
}): Plugin {
  return {
    name: 'vite-plugin-static-cms-admin-dashboard',

    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId
    },

    load(id) {
      if (id === resolvedVirtualModuleId)
        return generateVirtualConfigModule({
          config,
          previewStyles,
          identityWidget,
        })
    },
  }
}
