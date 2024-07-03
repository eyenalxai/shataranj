import { SelectStrategy } from "@/components/strategy/select-strategy"
import type { PlayerControls, SetPlayerStrategy } from "@/lib/types"
import { cn } from "@/lib/utils"

type SelectStrategiesProps = {
	playerControls: PlayerControls
	setPlayerStrategy: SetPlayerStrategy
}

export const SelectStrategies = ({ playerControls, setPlayerStrategy }: SelectStrategiesProps) => {
	return (
		<div className={cn("flex", "flex-row", "justify-center", "items-center", "gap-x-2")}>
			<SelectStrategy defaultValue={playerControls.w} player={"w"} setPlayerStrategy={setPlayerStrategy} />
			<SelectStrategy defaultValue={playerControls.b} player={"b"} setPlayerStrategy={setPlayerStrategy} />
		</div>
	)
}
