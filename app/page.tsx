"use client"

import { CustomChessboard } from "@/components/custom-chessboard"
import { OutcomeStatus } from "@/components/outcome-status"
import { SelectStrategies } from "@/components/strategy/select-strategies"
import { Button } from "@/components/ui/button"
import { useChessGame } from "@/lib/hooks/chess-game"
import { cn } from "@/lib/utils"

export default function Home() {
	const {
		chessboard,
		onPieceDrop,
		disabled,
		playerControls,
		setPlayerStrategy,
		gameOutcome,
		restart,
		isPaused,
		togglePause
	} = useChessGame()

	return (
		<div className={cn("flex", "flex-col", "items-start", "gap-y-2")}>
			<SelectStrategies playerControls={playerControls} setPlayerStrategy={setPlayerStrategy} />
			<div
				className={cn(["size-[320px]", "sm:size-[360pcx]", "md:size-[480px]", "lg:size-[560px]", "xl:size-[600px]"])}
			>
				<CustomChessboard fen={chessboard.fen()} onPieceDrop={onPieceDrop} disabled={disabled} />
			</div>
			<div className={cn("w-full", "flex", "flex-row", "justify-between", "items-center")}>
				<div className={cn("flex", "flex-row", "gap-2")}>
					<Button onClick={restart} variant={gameOutcome === null ? "outline" : "default"} className={cn("w-24")}>
						restart
					</Button>
					<Button disabled={gameOutcome !== null} onClick={togglePause} variant={"outline"} className={cn("w-24")}>
						{isPaused ? "resume" : "pause"}
					</Button>
				</div>
				<OutcomeStatus gameOutcome={gameOutcome} />
			</div>
		</div>
	)
}
