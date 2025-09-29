import { addPropertyControls, ControlType } from "framer"
import React, { useMemo } from "react"
import GumletVideo from "./GumletVideo"

export interface GumletVideoCodeProps {
  source?: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  preload?: boolean
  watermarkText?: string
  gmUserId?: string
  gmUserName?: string
  aspectRatio?: string
  allowFullscreen?: boolean
  title?: string
}

function parseVideoIdOrUrl(input?: string): { videoId?: string; embedUrlOverride?: string } {
  const raw = (input ?? "").trim()
  if (!raw) return {}
  try {
    const url = new URL(raw)
    if (/play\.gumlet\.io/.test(url.host)) {
      const parts = url.pathname.split("/").filter(Boolean)
      const idx = parts.findIndex((p) => p.toLowerCase() === "embed")
      if (idx >= 0 && parts[idx + 1]) {
        return { videoId: decodeURIComponent(parts[idx + 1]) }
      }
      return { embedUrlOverride: url.toString() }
    }
    return { embedUrlOverride: url.toString() }
  } catch {
    return { videoId: raw }
  }
}

export default function GumletVideoCode(props: GumletVideoCodeProps) {
  const {
    source = "",
    autoplay = false,
    muted = true,
    loop = false,
    controls = true,
    preload = false,
    watermarkText = "",
    gmUserId = "",
    gmUserName = "",
    aspectRatio = "16 / 9",
    allowFullscreen = true,
    title = "Gumlet Video",
  } = props

  const parsed = useMemo(() => parseVideoIdOrUrl(source), [source])

  const options = { autoplay, loop, controls, preload, muted, watermarkText, gmUserId, gmUserName }

  return (
    <GumletVideo
      videoId={parsed.videoId ?? ""}
      embedUrlOverride={parsed.embedUrlOverride}
      aspectRatio={aspectRatio}
      allowFullscreen={allowFullscreen}
      title={title}
      resolveEditorUser={false}
      options={options}
    />
  )
}

addPropertyControls(GumletVideoCode, {
  source: { type: ControlType.String, title: "Source", defaultValue: "" },
  autoplay: { type: ControlType.Boolean, title: "Autoplay", defaultValue: false },
  muted: { type: ControlType.Boolean, title: "Muted", defaultValue: true },
  controls: { type: ControlType.Boolean, title: "Controls", defaultValue: true },
  loop: { type: ControlType.Boolean, title: "Loop", defaultValue: false },
  preload: { type: ControlType.Boolean, title: "Preload", defaultValue: false },
  watermarkText: { type: ControlType.String, title: "Watermark", defaultValue: "" },
  gmUserId: { type: ControlType.String, title: "User ID", defaultValue: "" },
  gmUserName: { type: ControlType.String, title: "User Name", defaultValue: "" },
  aspectRatio: { type: ControlType.String, title: "Aspect", defaultValue: "16 / 9" },
  allowFullscreen: { type: ControlType.Boolean, title: "Fullscreen", defaultValue: true },
  title: { type: ControlType.String, title: "Title", defaultValue: "Gumlet Video" },
}) 