Platform.getInfo('kubejs').name = 'Fish A World'

StartupEvents.registry('item', event => {
    event.create('scroll')
})