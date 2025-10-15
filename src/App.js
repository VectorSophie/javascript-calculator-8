import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    const inputString = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요."); // await is crucial for actual user interface

    try {
      const calculateResult = this.calculateSum(inputString)
    } catch (error) {
      Console.print(error.message);
      throw error;
    }
  }

  calculateSum(inputString) {
    if (!inputString.trim()) {
      return 0; // empty input returns 0
    }

    const { inputNumbers, separators } = this.parseInput(inputString);
    const numbers = this.parseNumbers(inputNumbers, separators);
    this.exceptionHandling(numbers);

    let total = 0;
    numbers.forEach(number => {
      total += number;
    }); // simple sum logic, will refactor later
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
      .map(str => str.trim())
      .filter(str => str.length > 0);

    if (numberStrings.length === 0) {
      throw new Error('[ERROR] 입력값에 유효한 숫자가 없습니다.');
    }

    return numberStrings.map(str => {
      const num = Number(str);
      if (!Number.isInteger(num)) {
        throw new Error(`[ERROR] 입력값은 숫자여야 합니다: "${str}"`);
      }
      if (num < 0) {
        throw new Error(`[ERROR] 입력값은 자연수만 허용됩니다: "${str}"`);
      }
      return num;
    });
  }

  exceptionHandling(numbers) {
    // Target NaN
    if (numbers.some(isNaN)) {
      throw new Error("[ERROR] 입력값은 공백이 되어선 안됩니다.");
    }
    // Target non-integers
    if (numbers.some(number => !Number.isInteger(number))) {
      throw new Error("[ERROR] 입력값은 숫자여야 합니다.");
    }
    // Target non-natural numbers
    if (numbers.some(number => number < 0)) {
      throw new Error("[ERROR] 입력값은 자연수만 허용됩니다.");
    }
  }
}

export default App;
