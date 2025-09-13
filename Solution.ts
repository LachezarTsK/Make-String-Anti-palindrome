
/*
 Since the size of the input is guaranteed to be an even number, 
 concerning JavaScript/TypeScript, calculating half the size is just 
 by (input.length / 2) instead of Math.floor(input.length / 2)
*/

function makeAntiPalindrome(input: string): string {
    const frequency: number[] = new Array(Utils.ALPHABET_SIZE).fill(0);
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

function letterFrequencyExceedsLimitsToCreateAntipalindrome(frequency: number[], halfInputSize: number): boolean {
    for (let ch = Utils.ASCII_SMALL_CASE_A; ch <= Utils.ASCII_SMALL_CASE_Z; ++ch) {
        if (frequency[ch - Utils.ASCII_SMALL_CASE_A] > halfInputSize) {
            return true;
        }
    }
    return false;
}

function distributeLettersInAscendingOrder(frequency: number[], inputSize: number): string[] {
    const candidateForAntipalindrome: string[] = new Array(inputSize);

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

function replacePalindromicLettersWithSmallestPossibleLetters(antipalindrome: string[], inputSize: number): void {
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

function swap(antipalindrome: string[], rightToBeReplaced: number, replacementForRight: number): void {
    [antipalindrome[rightToBeReplaced], antipalindrome[replacementForRight]] =
    [antipalindrome[replacementForRight], antipalindrome[rightToBeReplaced]];
}

class Utils {
    static ALPHABET_SIZE = 26;
    static ASCII_SMALL_CASE_A = 97;
    static ASCII_SMALL_CASE_Z = 122;
    static NOT_POSSIBLE_TO_CREATE_ANTIPALINDROME = "-1";
}
