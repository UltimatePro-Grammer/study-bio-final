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

// https://stackoverflow.com/a/12646864
export function shuffleArray(originalArray: any[]) {
    const array = originalArray.slice(0); // duplicate
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
