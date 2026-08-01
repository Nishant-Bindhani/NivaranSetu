import { API_BASE_URL } from '@/shared/lib/axios'

export function GoogleAuthButton() {
  return (
    <>
      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        OR
        <div className="h-px flex-1 bg-border" />
      </div>

      <a
        href={`${API_BASE_URL}/v1/auth/google`}
        className="flex h-11 w-full items-center justify-center gap-2.5 rounded-md border border-border text-base font-medium transition-colors hover:bg-muted"
      >
        <svg viewBox="0 0 24 24" className="size-4.5" aria-hidden="true">
          <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.6 5.6 0 0 1-2.41 3.68v3.03h3.86c2.27-2.09 3.57-5.17 3.57-8.95Z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.86-3.03c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.12A11.99 11.99 0 0 0 12 24Z" />
          <path fill="#FBBC05" d="M5.27 14.26a7.2 7.2 0 0 1 0-4.52V6.62H1.28a12 12 0 0 0 0 10.76l3.99-3.12Z" />
          <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.62l3.99 3.12C6.22 6.86 8.87 4.75 12 4.75Z" />
        </svg>
        Continue with Google
      </a>
    </>
  )
}
