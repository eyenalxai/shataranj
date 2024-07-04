import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"
import type { ControlMethod, SetPlayerStrategy } from "@/lib/types"
import { cn } from "@/lib/utils"
import type { Color } from "chess.js"

type SelectStrategyProps = {
	value: ControlMethod
	player: Color
	setPlayerStrategy: SetPlayerStrategy
}

export const SelectStrategy = ({ value, player, setPlayerStrategy }: SelectStrategyProps) => {
	const strategyNames: Record<ControlMethod, string> = {
		manual: "manual",
		"random-move": "random move",
		"stockfish-10": "stockfish 10",
		"stockfish-100": "stockfish 100",
		"stockfish-500": "stockfish 500",
		"stockfish-1000": "stockfish 1000",
		"stockfish-2000": "stockfish 2000",
		"stockfish-3000": "stockfish 3000",
		"stockfish-5000": "stockfish 5000"
	}

	const oof = player === "w" ? "white" : "black"

	return (
		<div className={cn("flex", "flex-col", "justify-center", "items-start")}>
			<Select
				value={value}
				onValueChange={(value) => {
					console.log(value)
					console.log(player)
					setPlayerStrategy({
						player: player,
						strategy: value as ControlMethod
					})
				}}
			>
				<SelectTrigger className={cn("w-36")}>
					<SelectValue placeholder={`${oof} strategy`} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>{oof}</SelectLabel>
						{Object.entries(strategyNames).map(([strategy, name]) => (
							<SelectItem key={strategy} value={strategy}>
								{name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}
