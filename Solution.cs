
using System;

public class Solution
{
    private static readonly int ALPHABET_SIZE = 26;
    private static readonly string NOT_POSSIBLE_TO_CREATE_ANTIPALINDROME = "-1";

    public string MakeAntiPalindrome(string input)
    {
        int[] frequency = new int[ALPHABET_SIZE];
        foreach (char letter in input)
        {
            ++frequency[letter - 'a'];
        }
        if (LetterFrequencyExceedsLimitsToCreateAntipalindrome(frequency, input.Length / 2))
        {
            return NOT_POSSIBLE_TO_CREATE_ANTIPALINDROME;
        }

        char[] antipalindrome = DistributeLettersInAscendingOrder(frequency, input.Length);
        ReplacePalindromicLettersWithSmallestPossibleLetters(antipalindrome, input.Length);

        return new string(antipalindrome);
    }

    private bool LetterFrequencyExceedsLimitsToCreateAntipalindrome(int[] frequency, int halfInputSize)
    {
        for (char ch = 'a'; ch <= 'z'; ++ch)
        {
            if (frequency[ch - 'a'] > halfInputSize)
            {
                return true;
            }
        }
        return false;
    }

    private char[] DistributeLettersInAscendingOrder(int[] frequency, int inputSize)
    {
        char[] candidateForAntipalindrome = new char[inputSize];

        int index = 0;
        for (char ch = 'a'; ch <= 'z'; ++ch)
        {
            while (frequency[ch - 'a'] > 0)
            {
                candidateForAntipalindrome[index] = ch;
                ++index;
                --frequency[ch - 'a'];
            }
        }
        return candidateForAntipalindrome;
    }

    private void ReplacePalindromicLettersWithSmallestPossibleLetters(char[] antipalindrome, int inputSize)
    {
        int middleToTheLeft = (inputSize / 2) - 1;
        int right = (inputSize / 2);
        while (right < inputSize && antipalindrome[middleToTheLeft] == antipalindrome[right])
        {
            ++right;
        }

        int left = (inputSize / 2) - 1;
        int rightToBeReplaced = (inputSize / 2);
        int replacementForRight = right;

        while (replacementForRight < inputSize)
        {
            if (antipalindrome[left] == antipalindrome[rightToBeReplaced])
            {
                Swap(antipalindrome, rightToBeReplaced, replacementForRight);
            }
            --left;
            ++replacementForRight;
            ++rightToBeReplaced;
        }
    }

    private void Swap(char[] antipalindrome, int rightToBeReplaced, int replacementForRight)
    {
        char temp = antipalindrome[rightToBeReplaced];
        antipalindrome[rightToBeReplaced] = antipalindrome[replacementForRight];
        antipalindrome[replacementForRight] = temp;
    }
}
