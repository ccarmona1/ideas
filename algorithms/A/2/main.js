'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });

    main();
});

function readline() {
    return inputString[currentLine++];
}

function main() {
    const n = Number(readline());
    const stats = {}
    Array.from({ length: n }, (_, index) => {
        const round = index + 1;
        const [name, score] = readline().split(' ');
        const previusScore = stats[name]?.score || 0;
        const newScore = previusScore + Number(score);
        const previusMaxScore = stats[name]?.maxScore || 0;
        const newMaxScore = Math.max(previusMaxScore, newScore);
        stats[name] = {
            score: newScore,
            maxScore: newMaxScore,
            round: newMaxScore > previusMaxScore ? round : stats[name]?.round
        }
    });
    const winner = Object.entries(stats).reduce((futureWinner, participant) => {
        if (!futureWinner) {
            return participant;
        } else if (futureWinner[1].score === participant[1].score) {
            const isWinnerGettingMaxSooner = futureWinner[1].round < participant[1].round;
            return isWinnerGettingMaxSooner ? futureWinner : participant;
        } else {
            return futureWinner[1].score > participant[1].score ? futureWinner : participant;
        }
    }, undefined)
    console.log(winner[0])
}
