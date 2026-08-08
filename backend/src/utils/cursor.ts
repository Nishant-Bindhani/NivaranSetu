export type Cursor = { id: string; createdAt: string }

export function encodeCursor(cursor: Cursor): string {
  return Buffer.from(JSON.stringify(cursor)).toString('base64url')
}

export function decodeCursor(raw: string): Cursor {
  return JSON.parse(Buffer.from(raw, 'base64url').toString('utf-8'))
}
