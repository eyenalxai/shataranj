"use client"

import { useChessGame } from "@/lib/hooks/chess-game"
import { cn } from "@/lib/utils"
import { Chessboard } from "react-chessboard"

export default function Home() {
	const { game, onDrop } = useChessGame()

	return (
		<div className={cn(["w-5/6", "sm:w-4/5", "md:w-3/4", "lg:w-2/3", "xl:w-1/3"])}>
			<Chessboard position={game.fen()} onPieceDrop={onDrop} />
		</div>
	)
}
