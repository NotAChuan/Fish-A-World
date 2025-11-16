LootJS.lootTables(event => {
    // 清空所有钓鱼 loot 表
    event.clearLootTables(/.*gameplay\/fishing.*/)

    // 获取原版钓鱼表和第一个池
    const table = event.getLootTable("minecraft:gameplay/fishing")
    const pool = table.firstPool()

    // 遍历配置
    Object.keys(TIER_FISHING_LOOT).forEach(tierId => {
        const cfg = TIER_FISHING_LOOT[tierId]
        const groupWeight = cfg.groupWeight

        cfg.entries.forEach(entryCfg => {
            const finalWeight = groupWeight * entryCfg.weight

            const predicate = (player => {
                let tiers = player.persistentData.fish_tier

                // 如果没有 fish_tier，就默认 ["common"]
                if (!tiers) {
                    tiers = ["common"]
                }

                // 检查当前阶段是否在 tiers 数组中
                for (let i = 0; i < tiers.length; i++) {
                    if (tiers[i] === tierId) {
                        return true
                    }
                }
                return false
            })

            const entry = LootEntry.of(entryCfg.item)
                .when(c => c.matchPlayerCustom(predicate))

            entry.weight = finalWeight
            pool.addEntry(entry)
        })
    })
})