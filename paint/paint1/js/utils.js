let genID = (len) => {
    return Number(Math.random().toString().substr(3, len) + Date.now()).toString(36);
}
// console.log(genID())