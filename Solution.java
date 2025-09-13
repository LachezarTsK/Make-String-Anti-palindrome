
public class Solution {

    private static final int ALPHABET_SIZE = 26;
    private static final String NOT_POSSIBLE_TO_CREATE_ANTIPALINDROME = "-1";

    public String makeAntiPalindrome(String input) {
        int[] frequency = new int[ALPHABET_SIZE];
        for (char letter : input.toCharArray()) {
            ++frequency[letter - 'a'];
        }
        if (letterFrequencyExceedsLimitsToCreateAntipalindrome(frequency, input.length() / 2)) {
            return NOT_POSSIBLE_TO_CREATE_ANTIPALINDROME;
        }

        char[] antipalindrome = distributeLettersInAscendingOrder(frequency, input.length());
        replacePalindromicLettersWithSmallestPossibleLetters(antipalindrome, input.length());

        return String.valueOf(antipalindrome);
    }

    private boolean letterFrequencyExceedsLimitsToCreateAntipalindrome(int[] frequency, int halfInputSize) {
        for (char ch = 'a'; ch <= 'z'; ++ch) {
            if (frequency[ch - 'a'] > halfInputSize) {
                return true;
            }
        }
        return false;
    }

    private char[] distributeLettersInAscendingOrder(int[] frequency, int inputSize) {
        char[] candidateForAntipalindrome = new char[inputSize];

        int index = 0;
        for (char ch = 'a'; ch <= 'z'; ++ch) {
            while (frequency[ch - 'a'] > 0) {
                candidateForAntipalindrome[index] = ch;
                ++index;
                --frequency[ch - 'a'];
            }
        }
        return candidateForAntipalindrome;
    }

    private void replacePalindromicLettersWithSmallestPossibleLetters(char[] antipalindrome, int inputSize) {
        int middleToTheLeft = (inputSize / 2) - 1;
        int right = (inputSize / 2);
        while (right < inputSize && antipalindrome[middleToTheLeft] == antipalindrome[right]) {
            ++right;
        }

        int left = (inputSize / 2) - 1;
        int rightToBeReplaced = (inputSize / 2);
        int replacementForRight = right;

        while (replacementForRight < inputSize) {
            if (antipalindrome[left] == antipalindrome[rightToBeReplaced]) {
                swap(antipalindrome, rightToBeReplaced, replacementForRight);
            }
            --left;
            ++replacementForRight;
            ++rightToBeReplaced;
        }
    }

    private void swap(char[] antipalindrome, int rightToBeReplaced, int replacementForRight) {
        char temp = antipalindrome[rightToBeReplaced];
        antipalindrome[rightToBeReplaced] = antipalindrome[replacementForRight];
        antipalindrome[replacementForRight] = temp;
    }
}
