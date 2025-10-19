export function parseInput(input) {
    const customSeparatorRegex = /^\/\/(.)\n/; // Custom separator regex
    const defaultSeparators = [',', ':'];

    if (customSeparatorRegex.test(input)) {
      const match = input.match(customSeparatorRegex);
      const inputNumbers = input.slice(match[0].length).trim();
      const separators = [...defaultSeparators, match[1]]; // include custom separator
      return { inputNumbers, separators };
    }

    return { inputNumbers: input.trim(), separators: defaultSeparators };
  }

export function parseNumbers(inputNumbers, separators) {
    const escapedSeparators = separators.map((sep) =>
    sep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    ); // escape for . and :, etc
    const separatorsRegex = new RegExp(escapedSeparators.join('|'), 'g');
    const numberStrings = inputNumbers
      .split(separatorsRegex)
      .map((str) => str.trim())
      .filter(Boolean);
      // Re-lengthed for eslint

    if (numberStrings.length === 0) {
      throw new Error('[ERROR] 입력값에 유효한 숫자가 없습니다.');
    }

    const numbers = numberStrings
      .filter((str) => /^-?\d+(\.\d+)?$/.test(str))
      .map((str) => {
        const num = Number(str);
        if (!Number.isInteger(num)) {
          throw new Error(`[ERROR] 입력값은 숫자여야 합니다: "${str}"`);
        }
        if (num < 0) {
          throw new Error(`[ERROR] 입력값은 자연수만 허용됩니다: "${str}"`);
        }
        return num;
      });
    if (numbers.length === 0) {
      throw new Error('[ERROR] 입력값에 유효한 숫자가 없습니다.'); // ex. if invalid like a,b,c, they will still persist after parseinput
    } 
    return numbers;
  }