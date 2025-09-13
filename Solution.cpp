
#include <span>
#include <array>
#include <string>
using namespace std;

class Solution {

    static const int ALPHABET_SIZE = 26;
    inline static const string NOT_POSSIBLE_TO_CREATE_ANTIPALINDROME = "-1";

public:
    string makeAntiPalindrome(string input) const {
        array<int, ALPHABET_SIZE> frequency{};
        for (const auto& letter : input) {
            ++frequency[letter - 'a'];
        }
        if (letterFrequencyExceedsLimitsToCreateAntipalindrome(frequency, input.length() / 2)) {
            return NOT_POSSIBLE_TO_CREATE_ANTIPALINDROME;
        }

        string antipalindrome = distributeLettersInAscendingOrder(frequency, input.length());
        replacePalindromicLettersWithSmallestPossibleLetters(antipalindrome, input.length());

        return antipalindrome;
    }

private:
    bool letterFrequencyExceedsLimitsToCreateAntipalindrome(span<const int> frequency, int halfInputSize) const {
        for (char ch = 'a'; ch <= 'z'; ++ch) {
            if (frequency[ch - 'a'] > halfInputSize) {
                return true;
            }
        }
        return false;
    }

    string distributeLettersInAscendingOrder(span<int> frequency, int inputSize) const {
        string candidateForAntipalindrome;
        candidateForAntipalindrome.reserve(inputSize);

        for (char ch = 'a'; ch <= 'z'; ++ch) {
            while (frequency[ch - 'a'] > 0) {
                candidateForAntipalindrome.push_back(ch);
                --frequency[ch - 'a'];
            }
        }
        return candidateForAntipalindrome;
    }

    void replacePalindromicLettersWithSmallestPossibleLetters(string& antipalindrome, int inputSize) const {
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
                swap(antipalindrome[rightToBeReplaced], antipalindrome[replacementForRight]);
            }
            --left;
            ++replacementForRight;
            ++rightToBeReplaced;
        }
    }
};
