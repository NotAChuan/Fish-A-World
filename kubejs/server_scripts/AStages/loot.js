// 多阶段钓鱼掉落配置（stage0 只是“配置名”，不是实际阶段）
const STAGE_FISHING_LOOT = {
    // “无阶段”时用的默认掉落
    stage0: {
        groupWeight: 10,
        entries: [
            { item: "minecraft:oak_sapling", weight: 1 }, // 100% 橡树树苗
        ],
    },

    stage1: {
        groupWeight: 10,
        entries: [
            { item: "minecraft:stone", weight: 8 },
            { item: "minecraft:cobblestone", weight: 1 },
            { item: "minecraft:cod", weight: 1 },
        ],
    },

    stage2: {
        groupWeight: 40,
        entries: [
            { item: "minecraft:dirt", weight: 4 },
            { item: "minecraft:furnace", weight: 1 },
        ],
    },
}

// 这里列出“真正存在的阶段”，不包括 stage0
const REAL_STAGES = ["stage1", "stage2"] // 后面你加 stage3 就在这里加

LootJS.lootTables(event => {
    // 1. 清空所有钓鱼 loot 表
    event.clearLootTables(/.*gameplay\/fishing.*/)

    // 2. 获取原版钓鱼表和第一个池
    const table = event.getLootTable("minecraft:gameplay/fishing")
    const pool = table.firstPool()

    // 3. 遍历配置
    Object.keys(STAGE_FISHING_LOOT).forEach(stageId => {
        const cfg = STAGE_FISHING_LOOT[stageId]
        const groupWeight = cfg.groupWeight

        cfg.entries.forEach(entryCfg => {
            const finalWeight = groupWeight * entryCfg.weight

            // 针对 stage0 和其他阶段，使用不同的条件函数
            const predicate = (player => {
                if (stageId === "stage0") {
                    // “无阶段默认表”：玩家没有任何 REAL_STAGES 时才生效
                    for (let i = 0; i < REAL_STAGES.length; i++) {
                        if (player.stages.has(REAL_STAGES[i])) {
                            return false
                        }
                    }
                    return true
                } else {
                    // 普通阶段：玩家拥有这个阶段才参与
                    return player.stages.has(stageId)
                }
            })

            const entry = LootEntry.of(entryCfg.item)
                .when(c => c.matchPlayerCustom(predicate))

            entry.weight = finalWeight

            pool.addEntry(entry)
        })
    })
})
