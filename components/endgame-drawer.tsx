import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import type { GameOutcome } from "@/lib/types"
import { cn } from "@/lib/utils"

type EndgameDrawerProps = {
	gameOutcome: GameOutcome | null
	restart: () => void
}

export const EndgameDrawer = ({ gameOutcome, restart }: EndgameDrawerProps) => {
	const outcomeText: Record<GameOutcome, string> = {
		"threefold-repetition": "threefold repetition",
		draw: "draw",
		checkmate: "checkmate",
		stalemate: "stalemate",
		"insufficient-material": "insufficient material"
	}

	return (
		<Drawer open={gameOutcome !== null} dismissible={false}>
			<DrawerContent className={cn("flex", "justify-center", "items-center", "pb-12")}>
				<DrawerHeader>
					<DrawerTitle>{gameOutcome === null ? "game over" : outcomeText[gameOutcome]}</DrawerTitle>
				</DrawerHeader>
				<DrawerFooter>
					<Button autoFocus onClick={restart}>
						restart
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
