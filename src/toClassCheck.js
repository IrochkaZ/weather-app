//es5
/*function toClassCheck(someData) {
    return someData.replace(' ', '_').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
}

module.exports = toClassCheck; */


//es6
export function toClassCheck(someData) {
    return someData.replace(' ', '_').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
}
