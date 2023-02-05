import { on, init } from 'netlify-identity-widget'

export function initIdentity(adminPath: string) {
  on('init', (user) => {
    if (!user) {
      on('login', () => {
        document.location.href = adminPath
      })
    }
  })

  init()
}
