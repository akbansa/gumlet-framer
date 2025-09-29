import { CSSProperties, useEffect, useMemo, useState } from "react"

// A lightweight React component to embed Gumlet-hosted videos via iframe.
// - Renders responsive, secure iframe embed
// - Accepts video ID and player options via props
// - Supports dynamic watermark parameters via query params
// - Defaults to sensible, privacy-friendly settings

export interface GumletPlayerOptions {
  autoplay?: boolean
  loop?: boolean
  controls?: boolean
  preload?: boolean
  muted?: boolean
  // Dynamic watermark support (query params)
  watermarkText?: string
  // User-level analytics (query params)
  gmUserId?: string
  gmUserName?: string
}

export interface GumletVideoProps {
  videoId: string
  options?: GumletPlayerOptions
  className?: string
  style?: CSSProperties
  // Use CSS aspect-ratio value, defaults to 16 / 9
  aspectRatio?: string
  // Allow fullscreen. You can disable if embedding within constrained layouts.
  allowFullscreen?: boolean
  // Title attribute for accessibility
  title?: string
  // If you already have a full embed URL from Gumlet, you can provide it to bypass videoId construction
  embedUrlOverride?: string
  // Whether to resolve and use Framer editor user as fallback for watermark/analytics
  resolveEditorUser?: boolean
}

function buildQuery(options?: GumletPlayerOptions): string {
  if (!options) return ""

  const params = new URLSearchParams()

  const set = (key: string, val: unknown) => {
    if (val === undefined || val === null) return
    // Convert booleans to string true/false for consistency
    if (typeof val === "boolean") params.set(key, val ? "true" : "false")
    else params.set(key, String(val))
  }

  set("autoplay", options.autoplay)
  set("loop", options.loop)
  set("controls", options.controls)
  set("preload", options.preload)
  set("muted", options.muted)

  // Watermark-related (these parameter names may vary across accounts; align with your Gumlet config)
  set("watermark_text", options.watermarkText)

  // User-level analytics params
  set("gm_user_id", options.gmUserId)
  set("gm_user_name", options.gmUserName)

  const q = params.toString()
  return q ? `?${q}` : ""
}

export default function GumletVideo({
  videoId,
  options,
  className,
  style,
  aspectRatio = "16 / 9",
  allowFullscreen = true,
  title = "Gumlet Video",
  embedUrlOverride,
  resolveEditorUser = true,
}: GumletVideoProps) {
  const [editorUser, setEditorUser] = useState<{ id?: string; name?: string } | null>(null)

  // Resolve Framer editor (plugin) user if available
  useEffect(() => {
    let cancelled = false
    if (!resolveEditorUser) return () => { cancelled = true }
    ;(async () => {
      try {
        const mod = await import("framer-plugin")
        const u = await mod.framer.getCurrentUser()
        if (!cancelled) setEditorUser(u as any)
      } catch {
        // Not in plugin env or API unavailable; ignore
      }
    })()
    return () => {
      cancelled = true
    }
  }, [resolveEditorUser])

  const mergedOptions: GumletPlayerOptions | undefined = useMemo(() => {
    // Start from provided options
    const base = options ? { ...options } : undefined

    // If we should not resolve editor user, or we don't have one, just return provided options
    if (!resolveEditorUser || !editorUser) return base

    // Otherwise, only fill in missing WATERMARK from editor user.
    // Do NOT add analytics params unless explicitly passed in options
    return {
      ...base,
      watermarkText: base?.watermarkText ?? editorUser.name ?? editorUser.id,
      gmUserId: base?.gmUserId,
      gmUserName: base?.gmUserName,
    }
  }, [options, resolveEditorUser, editorUser?.id, editorUser?.name])

  const src = useMemo(() => {
    if (embedUrlOverride) return embedUrlOverride
    const base = `https://play.gumlet.io/embed/${encodeURIComponent(videoId)}`
    return `${base}${buildQuery(mergedOptions)}`
  }, [videoId, mergedOptions, embedUrlOverride])

  const containerStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    aspectRatio,
    ...style,
  }

  const iframeStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: 0,
  }

  return (
    <div className={className} style={containerStyle}>
      <iframe
        src={src}
        title={title}
        allow={[
          "autoplay",
          "encrypted-media",
          "picture-in-picture",
          "fullscreen",
          "accelerometer",
          "gyroscope",
        ]
          .filter(Boolean)
          .join("; ")}
        allowFullScreen={allowFullscreen}
        style={iframeStyle}
      />
    </div>
  )
}
