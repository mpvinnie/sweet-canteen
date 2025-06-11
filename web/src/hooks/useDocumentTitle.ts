import { useEffect } from 'react'

export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title
    if (description) {
      let metaDesc = document.querySelector(
        "meta[name='description']"
      ) as HTMLMetaElement | null
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.name = 'description'
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', description)
    }
  }, [title, description])
}
