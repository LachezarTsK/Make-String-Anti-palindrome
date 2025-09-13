
package main
import "reflect"

const ALPHABET_SIZE = 26
const NOT_POSSIBLE_TO_CREATE_ANTIPALINDROME = "-1"

func makeAntiPalindrome(input string) string {
    frequency := make([]int, ALPHABET_SIZE)
    for _, letter := range input {
            frequency[letter - 'a']++
    }
    if letterFrequencyExceedsLimitsToCreateAntipalindrome(frequency, len(input) / 2) {
        return NOT_POSSIBLE_TO_CREATE_ANTIPALINDROME
    }

    antipalindrome := distributeLettersInAscendingOrder(frequency, len(input))
    replacePalindromicLettersWithSmallestPossibleLetters(antipalindrome, len(input))

    return string(antipalindrome)
}

func letterFrequencyExceedsLimitsToCreateAntipalindrome(frequency []int, halfInputSize int) bool {
    for ch := 'a'; ch <= 'z'; ch++ {
        if frequency[ch - 'a'] > halfInputSize {
            return true
        }
    }
    return false
}

func distributeLettersInAscendingOrder(frequency []int, inputSize int) []rune {
    candidateForAntipalindrome := make([]rune, inputSize)

    index := 0
    for ch := 'a'; ch <= 'z'; ch++ {
        for frequency[ch - 'a'] > 0 {
            candidateForAntipalindrome[index] = ch
            index++
            frequency[ch - 'a']--
        }
    }
    return candidateForAntipalindrome
}

func replacePalindromicLettersWithSmallestPossibleLetters(antipalindrome []rune, inputSize int) {
    middleToTheLeft := (inputSize / 2) - 1
    right := (inputSize / 2)
    for right < inputSize && antipalindrome[middleToTheLeft] == antipalindrome[right] {
        right++
    }

    left := (inputSize / 2) - 1
    rightToBeReplaced := (inputSize / 2)
    replacementForRight := right
    swap := reflect.Swapper(antipalindrome)

    for replacementForRight < inputSize {
        if antipalindrome[left] == antipalindrome[rightToBeReplaced] {
            swap(rightToBeReplaced, replacementForRight)
        }
        left--
        replacementForRight++
        rightToBeReplaced++
    }
}
