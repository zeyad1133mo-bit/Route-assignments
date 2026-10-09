


var romanToInt = function (s) {
    const map = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    let result = 0;

    for (let i = 0; i < s.length; i++) {
        const current = map[s[i]];
        const next = map[s[i + 1]];

        if (next && current < next) {
            result -= current;
        } else {
            result += current;
        }
    }

    return result;
};


console.log(romanToInt("III"));
console.log(romanToInt("IV"));
console.log(romanToInt("IX"));
console.log(romanToInt("LVIII"));
console.log(romanToInt("MCMXCIV")); 
