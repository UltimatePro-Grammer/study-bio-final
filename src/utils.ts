export function isStarred(questionId: string) {
    const starredStr = localStorage.getItem("starred");
    if (!starredStr) return false;

    const starred = starredStr.split(",").includes(questionId);
    return starred;
}

export function addStar(questionId: string) {
    const starredStr = localStorage.getItem("starred") ?? "";
    localStorage.setItem("starred", starredStr + "," + questionId);
}

export function removeStar(questionId: string) {
    const starredStr = localStorage.getItem("starred") ?? "";
    localStorage.setItem("starred", starredStr.replace("," + questionId, ""));
}
