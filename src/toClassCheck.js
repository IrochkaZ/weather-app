
export function toClassCheck(someData) {
    return someData.replace(' ', '_').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
}
