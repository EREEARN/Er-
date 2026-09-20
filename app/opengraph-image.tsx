import { ImageResponse } from "next/og";
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: 80,
                    background: "linear-gradient(135deg, #4F46E5 0%, #111827 100%)",
                    color: "#fff",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ fontSize: 64, fontWeight: 700 }}>{SITE_NAME}</div>
                <div style={{ marginTop: 24, fontSize: 32, maxWidth: 900, color: "#EEF2FF" }}>
                    {DEFAULT_DESCRIPTION}
                </div>
            </div>
        ),
        { ...size }
    );
}
