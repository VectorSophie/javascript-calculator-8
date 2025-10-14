import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    const input = "덧셈할 문자열을 입력해 주세요."
    const inputString = await Console.readLineAsync(input); //await is crucial for actual user interface
  }
}

export default App;
