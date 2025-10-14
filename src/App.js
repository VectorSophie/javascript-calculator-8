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
    // calculateSum logic placeholder
  } 

  exceptionHandler(numbers) {
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
