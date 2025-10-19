import { Console } from '@woowacourse/mission-utils';
import {parseInput, parseNumbers} from '../src/Parser.js'

class App {
  async run() {
    Console.print('덧셈할 문자열을 입력해 주세요.');
    const inputString = await Console.readLineAsync(''); // await is crucial for actual user interface

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

    const { inputNumbers, separators } = parseInput(inputString); // not using this. for foreign imports
    const numbers = parseNumbers(inputNumbers, separators);
    const total = numbers.reduce((sum, num) => sum + num, 0); // Refactored using reduce
    return total;
  }

}

export default App;
