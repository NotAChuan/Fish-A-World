PlayerEvents.loggedIn(event => {
    const player = event.player

    // 只在第一次登录时初始化
    if (!player.stages.has("player_start")) {
        player.stages.add("player_start")

        // 设置初始钓鱼等级
        // common uncommon rare epic mythic ancient
        player.persistentData.fish_tier = ["common"]
    }
})
