const Status = {
    BACKLOG : `backlog`,
    PROCESS: `process`,
    DONE: `done`,
    BIN: `bin`
}

const StatusLabel = {
    [Status.BACKLOG]: `Бэклог`,
    [Status.PROCESS]: `В процессе`,
    [Status.DONE]: `Готово`,
    [Status.BIN]: `Корзина`
}

export {Status, StatusLabel};