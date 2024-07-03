"use client"

import { useChessGame } from "@/lib/hooks/chess-game"
import { cn } from "@/lib/utils"
import { Chessboard } from "react-chessboard"

export default function Home() {
	const { chessboard, onPieceDrop, disabled, setPlayerStrategy } = useChessGame()

	return (
		<div className={cn(["size-[320px]", "sm:size-[360pcx]", "md:size-[480px]", "lg:size-[560px]", "xl:size-[600px]"])}>
			<Chessboard
				position={chessboard.fen()}
				onPieceDrop={onPieceDrop}
				arePiecesDraggable={!disabled}
				customDarkSquareStyle={{
					backgroundColor: "#404040"
				}}
				customLightSquareStyle={{
					backgroundColor: "#737373"
				}}
			/>
		</div>
	)
}
