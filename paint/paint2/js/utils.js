let getId = (len) => {
    return Number(Math.random().toString().substr(3, len) + Date.now()).toString(36);
}
