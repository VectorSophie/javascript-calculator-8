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

  parseInput(inputString) {
    // parseInput placeholder
  }

  parseNumber(inputNumbers, separators) {
    // parseNumber placeholder
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
      throw new Error("[ERROR] 입력값은 양수만 허용됩니다.");
    }
  }
}

export default App;
