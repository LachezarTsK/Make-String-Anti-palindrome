
class Solution {

    private companion object {
        const val ALPHABET_SIZE = 26
        const val NOT_POSSIBLE_TO_CREATE_ANTIPALINDROME = "-1"
    }

    fun makeAntiPalindrome(input: String): String {
        val frequency = IntArray(ALPHABET_SIZE)
        for (letter in input) {
            ++frequency[letter - 'a']
        }
        if (letterFrequencyExceedsLimitsToCreateAntipalindrome(frequency, input.length / 2)) {
            return NOT_POSSIBLE_TO_CREATE_ANTIPALINDROME
        }

        val antipalindrome = distributeLettersInAscendingOrder(frequency, input.length)
        replacePalindromicLettersWithSmallestPossibleLetters(antipalindrome, input.length)

        return String(antipalindrome)
    }

    private fun letterFrequencyExceedsLimitsToCreateAntipalindrome(frequency: IntArray, halfInputSize: Int): Boolean {
        for (ch in 'a'..'z') {
            if (frequency[ch - 'a'] > halfInputSize) {
                return true
            }
        }
        return false
    }

    private fun distributeLettersInAscendingOrder(frequency: IntArray, inputSize: Int): CharArray {
        val candidateForAntipalindrome = CharArray(inputSize)

        var index = 0
        for (ch in 'a'..'z') {
            while (frequency[ch - 'a'] > 0) {
                candidateForAntipalindrome[index] = ch
                ++index
                --frequency[ch - 'a']
            }
        }
        return candidateForAntipalindrome
    }

    private fun replacePalindromicLettersWithSmallestPossibleLetters(antipalindrome: CharArray, inputSize: Int) {
        val middleToTheLeft = (inputSize / 2) - 1
        var right = (inputSize / 2)
        while (right < inputSize && antipalindrome[middleToTheLeft] == antipalindrome[right]) {
            ++right
        }

        var left = (inputSize / 2) - 1
        var rightToBeReplaced = (inputSize / 2)
        var replacementForRight = right

        while (replacementForRight < inputSize) {
            if (antipalindrome[left] == antipalindrome[rightToBeReplaced]) {
                swap(antipalindrome, rightToBeReplaced, replacementForRight)
            }
            --left
            ++replacementForRight
            ++rightToBeReplaced
        }
    }

    private fun swap(antipalindrome: CharArray, rightToBeReplaced: Int, replacementForRight: Int) {
        val temp = antipalindrome[rightToBeReplaced]
        antipalindrome[rightToBeReplaced] = antipalindrome[replacementForRight]
        antipalindrome[replacementForRight] = temp
    }
}
