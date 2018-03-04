import marked from 'marked'

export const loadMarkdownContent = async (fileName: string): Promise<string> => {
  const response = await fetch(`/content/${fileName}.md`)
  if (!response.ok) {
    throw Error('Content does not exist')
  }
  const text = await response.text()
  return marked(text)
}
