import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    const inputString = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.'); // await is crucial for actual user interface

    try {
      const calculateResult = this.calculateSum(inputString);
      Console.print(`결과 : ${calculateResult}`);
    } catch (error) {
      Console.print(error.message);
      return Promise.reject(error);
    }
  }

  calculateSum(inputString) {
    if (!inputString.trim()) {
      return 0; // empty input returns 0
    }

    const { inputNumbers, separators } = this.parseInput(inputString);
    const numbers = this.parseNumbers(inputNumbers, separators);
    const total = numbers.reduce((sum, num) => sum + num, 0); // Refactored using reduce
    return total;
  }

  parseInput(input) {
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

  parseNumbers(inputNumbers, separators) {
    const separatorsRegex = new RegExp(separators.join('|'), 'g');
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
  // Refactored in order to match Airbnb eslint
}

export default App;
