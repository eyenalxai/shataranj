"use client"

import { CustomChessboard } from "@/components/custom-chessboard"
import { SelectStrategies } from "@/components/strategy/select-strategies"
import { useChessGame } from "@/lib/hooks/chess-game"
import { cn } from "@/lib/utils"

export default function Home() {
	const { chessboard, onPieceDrop, disabled, playerControls, setPlayerStrategy } = useChessGame()

	return (
		<div className={cn("flex", "flex-col", "items-start", "gap-y-2")}>
			<SelectStrategies playerControls={playerControls} setPlayerStrategy={setPlayerStrategy} />
			<div
				className={cn(["size-[320px]", "sm:size-[360pcx]", "md:size-[480px]", "lg:size-[560px]", "xl:size-[600px]"])}
			>
				<CustomChessboard fen={chessboard.fen()} onPieceDrop={onPieceDrop} disabled={disabled} />
			</div>
		</div>
	)
}
