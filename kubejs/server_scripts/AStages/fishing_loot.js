// 多阶段钓鱼掉落配置
// common uncommon rare epic mythic ancient
const TIER_FISHING_LOOT = {
    common: {
        groupWeight: 10,
        entries: [
            { item: "minecraft:stone", weight: 8 },
            { item: "minecraft:cobblestone", weight: 1 },
            { item: "minecraft:cod", weight: 1 },
        ],
    },

    uncommon: {
        groupWeight: 40,
        entries: [
            { item: "minecraft:dirt", weight: 4 },
            { item: "minecraft:furnace", weight: 1 },
        ],
    },
}