import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

export default defineConfig({
    plugins: [react()],
    build: {
        target: "ES2022",
        lib: {
            entry: "src/components/GumletVideo.framer.tsx",
            name: "GumletVideo",
            fileName: () => "gumlet-video.es.js",
            formats: ["es"],
        },
        rollupOptions: {
            external: ["react", "react-dom", "framer", "framer-motion"],
            output: {
                preserveModules: false,
            },
        },
        sourcemap: true,
        emptyOutDir: false,
        outDir: "dist",
    },
}) 