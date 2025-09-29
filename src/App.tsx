import { framer } from "framer-plugin"
import "./App.css"
import { useEffect, useMemo, useState } from "react"
import GumletVideo from "./components/GumletVideo"

framer.showUI({
    position: "top right",
    width: 840,
    height: 700,
})

export function App() {
    const [videoInput, setVideoInput] = useState<string>("674fea04f1412ab64f697e11")
    const [componentUrl, setComponentUrl] = useState<string>("https://cdn.jsdelivr.net/gh/akbansa/gumlet-framer@v0.1.0/dist/gumlet-video.es.js")
    const [watermarkVar, setWatermarkVar] = useState<"id" | "name" | null>("name")
    const [trackAnalytics, setTrackAnalytics] = useState<boolean>(true)
    const [useEditorUser, setUseEditorUser] = useState<boolean>(true)
    const [editorUser, setEditorUser] = useState<{
        id?: string
        name?: string
    } | null>(null)

    // Helper to build query string similar to GumletVideo component
    const buildQuery = (opts: Record<string, any>) => {
        const params = new URLSearchParams()
        const set = (k: string, v: unknown) => {
            if (v === undefined || v === null) return
            if (typeof v === "boolean") params.set(k, v ? "true" : "false")
            else params.set(k, String(v))
        }
        set("autoplay", opts.autoplay)
        set("loop", opts.loop)
        set("controls", opts.controls)
        set("preload", opts.preload)
        set("watermark_text", opts.watermarkText)
        set("gm_user_id", opts.gmUserId)
        set("gm_user_name", opts.gmUserName)
        const q = params.toString()
        return q ? `?${q}` : ""
    }

    // Derive normalized videoId from input that could be an ID or a full embed URL
    const derivedVideoId = useMemo(() => {
        const raw = videoInput.trim()
        if (!raw) return ""
        try {
            const url = new URL(raw)
            // Expect formats like https://play.gumlet.io/embed/<VIDEO_ID>
            const parts = url.pathname.split("/").filter(Boolean)
            const idx = parts.findIndex((p) => p.toLowerCase() === "embed")
            if (idx >= 0 && parts[idx + 1]) return decodeURIComponent(parts[idx + 1])
            // If path only, last segment as id
            return decodeURIComponent(parts[parts.length - 1] ?? raw)
        } catch {
            // Not a URL, treat as raw ID
            return raw
        }
    }, [videoInput])

    useEffect(() => {
        let cancelled = false
        ;(async () => {
            try {
                const u = await framer.getCurrentUser()
                if (!cancelled) setEditorUser(u)
            } catch (e) {
                // Swallow errors in demo UI
                console.warn("framer.getCurrentUser() failed", e)
            }
        })()
        return () => {
            cancelled = true
        }
    }, [])

    return (
        <main>
            <h4>Gumlet Video Embed</h4>
            <section style={{ marginTop: 4, marginBottom: 4, width: "75%" }}>
                <div style={{ fontWeight: 600, marginBottom: 3 }}>Video ID or Embed URL</div>
                <input
                    type="text"
                    value={videoInput}
                    onChange={(e) => setVideoInput(e.currentTarget.value)}
                    placeholder="e.g. 674fea04f1412ab64f697e11 or https://play.gumlet.io/embed/<id>"
                    style={{ width: "100%", padding: 8, fontFamily: "inherit" }}
                />
                <div style={{ color: "#666", fontSize: 12, marginTop: 4 }}>
                    Paste a Gumlet embed URL or a video ID.
                </div>
            </section>
            <section style={{ marginTop: 4, marginBottom: 4, width: "75%" }}>
                <div style={{ fontWeight: 600, marginBottom: 3 }}>Component Module URL (recommended)</div>
                <input
                    type="text"
                    value={componentUrl}
                    onChange={(e) => setComponentUrl(e.currentTarget.value)}
                    placeholder="https://framer.dev/m/<your-module>.js"
                    style={{ width: "100%", padding: 8, fontFamily: "inherit" }}
                />
                <div style={{ color: "#666", fontSize: 12, marginTop: 4 }}>
                    A default module URL is pre-filled. Replace it with your own later if needed.
                </div>
            </section>
            <section style={{ marginTop: 4, marginBottom: 4 }}>
                <div style={{ fontWeight: 600, marginBottom: 3 }}>Dynamic watermark value</div>
                <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                    <label style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <input
                            type="checkbox"
                            checked={watermarkVar === "id"}
                            onChange={() => setWatermarkVar(watermarkVar === "id" ? null : "id")}
                        />
                        User ID
                    </label>
                    <label style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <input
                            type="checkbox"
                            checked={watermarkVar === "name"}
                            onChange={() => setWatermarkVar(watermarkVar === "name" ? null : "name")}
                        />
                        Name
                    </label>
                </div>
                <div style={{ color: "#666", fontSize: 12, marginTop: 4 }}>
                    This will be passed to the player as a dynamic watermark text.
                    Navigate <a href="https://dash.gumlet.com/video/player" target="_blank">here</a> to set up dynamic watermark in your player settings in Gumlet account
                </div>
            </section>
            <section style={{ marginTop: 4, marginBottom: 4 }}>
                <div style={{ fontWeight: 600, marginBottom: 3 }}>User-level analytics</div>
                <label style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <input
                        type="checkbox"
                        checked={trackAnalytics}
                        onChange={(e) => setTrackAnalytics(e.currentTarget.checked)}
                    />
                    Track user-level analytics
                </label>
                <div style={{ marginTop: 6 }}>
                    <label style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <input
                            type="checkbox"
                            checked={useEditorUser}
                            onChange={() => setUseEditorUser(!useEditorUser)}
                        />
                        Use Framer editor user (getCurrentUser)
                    </label>
                    <div style={{ color: "#666", fontSize: 12, marginTop: 4 }}>
                        {useEditorUser
                            ? editorUser
                                ? `Using editor user: ${editorUser.name ?? editorUser.id}`
                                : "No editor user resolved"
                            : "Editor user not used"}
                    </div>
                </div>
            </section>
            <section style={{ marginTop: 8, width: "75%" }}>
                <h4>GumletVideo preview</h4>
                <GumletVideo
                    videoId={derivedVideoId || "674fea04f1412ab64f697e11"}
                    resolveEditorUser={useEditorUser}
                    options={{
                        controls: true,
                        autoplay: false,
                        // Resolve to Framer editor user if enabled, otherwise undefined
                        watermarkText: useEditorUser
                            ? (watermarkVar === "id"
                                  ? editorUser?.id
                                  : watermarkVar === "name"
                                  ? editorUser?.name
                                  : undefined)
                            : undefined,
                        gmUserId: useEditorUser && trackAnalytics ? editorUser?.id : undefined,
                        gmUserName: useEditorUser && trackAnalytics ? editorUser?.name : undefined,
                    }}
                />
                <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                    <button
                        onClick={async () => {
                            const opts = {
                                controls: true,
                                autoplay: false,
                                watermarkText: useEditorUser
                                    ? (watermarkVar === "id"
                                          ? editorUser?.id
                                          : watermarkVar === "name"
                                          ? editorUser?.name
                                          : undefined)
                                    : undefined,
                                gmUserId: useEditorUser && trackAnalytics ? editorUser?.id : undefined,
                                gmUserName: useEditorUser && trackAnalytics ? editorUser?.name : undefined,
                            }
                            const vid = derivedVideoId || "674fea04f1412ab64f697e11"

                            try {
                                const hasIsAllowed = typeof (framer as any).isAllowedTo === "function"
                                if (!hasIsAllowed) {
                                    await (framer as any).notify(
                                        "Cannot verify permissions. Please run inside Framer editor (latest) and try again.",
                                        { type: "warning" }
                                    )
                                    return
                                }

                                if (componentUrl.trim()) {
                                    // Insert Code Component instance
                                    let canAdd = false
                                    try {
                                        canAdd = (await (framer as any).isAllowedTo("addComponentInstance")) === true
                                    } catch {
                                        canAdd = false
                                    }
                                    if (!canAdd) {
                                        await framer.notify("Missing permission to insert components.", { variant: "warning" })
                                        return
                                    }
                                    const instance = await (framer as any).addComponentInstance({ url: componentUrl.trim() })
                                    const nodeId: string = typeof instance === "string" ? instance : ((instance as any).id as string)
                                    if (!nodeId) throw new Error("Failed to create component instance")

                                    // Set its controls to match our options
                                    const controls: Record<string, any> = {
                                        videoId: vid,
                                        autoplay: !!opts.autoplay,
                                        loop: false,
                                        controls: !!opts.controls,
                                        preload: false,
                                        watermarkText: opts.watermarkText,
                                        gmUserId: opts.gmUserId,
                                        gmUserName: opts.gmUserName,
                                        aspectRatio: "16 / 9",
                                        allowFullscreen: true,
                                        title: "Gumlet Video",
                                    }

                                    try {
                                        await (framer as any).setAttributes(nodeId, { controls } as any)
                                    } catch (e) {
                                        console.warn("Failed setting controls", e)
                                    }

                                    try {
                                        await (framer as any).zoomIntoView([nodeId])
                                    } catch {}
                                    await framer.notify("Inserted GumletVideo component", { variant: "success" })
                                    return
                                }

                                // Fallback: Insert plain frame with link
                                let canCreate = false
                                try {
                                    canCreate = (await framer.isAllowedTo("createFrameNode")) === true
                                } catch (e) {
                                    canCreate = false
                                }
                                if (!canCreate) {
                                    await framer.notify("You don't have permission to insert nodes on this canvas.", {variant: "warning"})
                                    return
                                }

                                let canSet = false
                                let canZoom = false
                                try {
                                    canSet = (await (framer as any).isAllowedTo("setAttributes")) === true
                                } catch {
                                    canSet = false
                                }
                                try {
                                    canZoom = (await (framer as any).isAllowedTo("zoomIntoView")) === true
                                } catch {
                                    canZoom = false
                                }

                                const url = `https://play.gumlet.io/embed/${encodeURIComponent(vid)}${buildQuery(opts)}`

                                const rawNode = await framer.createFrameNode({
                                    name: "Gumlet Video",
                                    width: "640px",
                                    height: "360px"
                                })
                                const nodeId: string =
                                    typeof rawNode === "string"
                                        ? rawNode
                                        : (((rawNode as any) && ((rawNode as any).id || (rawNode as any).nodeId)) as string)
                                if (!nodeId) throw new Error("Failed to resolve created node id")

                                if (canSet === true) {
                                    await framer.setAttributes(
                                        nodeId,
                                        {
                                            name: "Gumlet Video",
                                            link: url,
                                            linkOpenInNewTab: false,
                                        } as any
                                    )
                                }

                                if (canZoom === true) {
                                    await framer.zoomIntoView([nodeId])
                                }
                                await framer.notify("Inserted Gumlet Video to canvas", { variant: "success" })
                            } catch (e) {
                                console.warn("Insert failed", e)
                                await framer.notify(
                                    "Insert failed. Make sure you're running inside Framer editor and the plugin has canvas access.",
                                    { variant: "error" }
                                )
                            }
                        }}
                    >
                        Insert Video
                    </button>
                </div>
            </section>
        </main>
    )
}
