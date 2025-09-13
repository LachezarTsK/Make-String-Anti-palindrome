
/*
 Since the size of the input is guaranteed to be an even number, 
 concerning JavaScript/TypeScript, calculating half the size is just 
 by (input.length / 2) instead of Math.floor(input.length / 2)
 */

/**
 * @param {string} input
 * @return {string}
 */
var makeAntiPalindrome = function (input) {
    const frequency = new Array(Utils.ALPHABET_SIZE).fill(0);
    for (let i = 0; i < input.length; ++i) {
        ++frequency[input.codePointAt(i) - Utils.ASCII_SMALL_CASE_A];
    }
    if (letterFrequencyExceedsLimitsToCreateAntipalindrome(frequency, input.length / 2)) {
        return Utils.NOT_POSSIBLE_TO_CREATE_ANTIPALINDROME;
    }

    const antipalindrome = distributeLettersInAscendingOrder(frequency, input.length);
    replacePalindromicLettersWithSmallestPossibleLetters(antipalindrome, input.length);

    return antipalindrome.join('');
};

/**
 * @param {number[]} frequency
 * @param {number} halfInputSize 
 * @return {boolean}
 */
function letterFrequencyExceedsLimitsToCreateAntipalindrome(frequency, halfInputSize) {
    for (let ch = Utils.ASCII_SMALL_CASE_A; ch <= Utils.ASCII_SMALL_CASE_Z; ++ch) {
        if (frequency[ch - Utils.ASCII_SMALL_CASE_A] > halfInputSize) {
            return true;
        }
    }
    return false;
}

/**
 * @param {number[]} frequency
 * @param {number} inputSize 
 * @return {string[]}
 */
function distributeLettersInAscendingOrder(frequency, inputSize) {
    const candidateForAntipalindrome = new Array(inputSize);

    let index = 0;
    for (let ch = Utils.ASCII_SMALL_CASE_A; ch <= Utils.ASCII_SMALL_CASE_Z; ++ch) {
        while (frequency[ch - Utils.ASCII_SMALL_CASE_A] > 0) {
            candidateForAntipalindrome[index] = String.fromCodePoint(ch);
            ++index;
            --frequency[ch - Utils.ASCII_SMALL_CASE_A];
        }
    }
    return candidateForAntipalindrome;
}

/**
 * @param {string[]} antipalindrome
 * @param {number} inputSize 
 * @return {void}
 */
function replacePalindromicLettersWithSmallestPossibleLetters(antipalindrome, inputSize) {
    const middleToTheLeft = (inputSize / 2) - 1;
    let right = (inputSize / 2);
    while (right < inputSize && antipalindrome[middleToTheLeft] === antipalindrome[right]) {
        ++right;
    }

    let left = (inputSize / 2) - 1;
    let rightToBeReplaced = (inputSize / 2);
    let replacementForRight = right;

    while (replacementForRight < inputSize) {
        if (antipalindrome[left] === antipalindrome[rightToBeReplaced]) {
            swap(antipalindrome, rightToBeReplaced, replacementForRight);
        }
        --left;
        ++replacementForRight;
        ++rightToBeReplaced;
    }
}

/**
 * @param {string[]} antipalindrome
 * @param {number} rightToBeReplaced
 * @param {number} replacementForRight 
 * @return {void}
 */
function swap(antipalindrome, rightToBeReplaced, replacementForRight) {
    [antipalindrome[rightToBeReplaced], antipalindrome[replacementForRight]] =
    [antipalindrome[replacementForRight], antipalindrome[rightToBeReplaced]];
}

class Utils {
    static ALPHABET_SIZE = 26;
    static ASCII_SMALL_CASE_A = 97;
    static ASCII_SMALL_CASE_Z = 122;
    static NOT_POSSIBLE_TO_CREATE_ANTIPALINDROME = "-1";
}
