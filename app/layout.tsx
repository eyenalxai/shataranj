import "./globals.css"
import { Providers } from "@/components/providers"
import { fontMono } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"

const TITLE = "zugzwangia"
const DESCRIPTION = "google en passant"

export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	openGraph: {
		title: TITLE,
		description: DESCRIPTION,
		type: "website"
	}
}

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
	]
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn("font-sans", "antialiased", fontMono.className)}>
				<Providers attribute="class" defaultTheme="system" enableSystem>
					<main className={cn("w-full", "flex", "justify-center", "items-center", "mt-12")}>{children}</main>
				</Providers>
			</body>
		</html>
	)
}
