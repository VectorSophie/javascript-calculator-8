import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("문자열 계산기", () => {
  test("커스텀 구분자 사용", async () => {
    const inputs = ["//;\n1"];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ["결과 : 1"];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  // 예외 테스트들
  test("음수 입력", async () => {
    const inputs = ["-1,2,3"];
    mockQuestions(inputs);

    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR] 입력값은 자연수만 허용됩니다: "-1"');
  });

  test("소수 입력", async () => {
    const inputs = ["1,2.5,3"];
    mockQuestions(inputs);

    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR] 입력값은 숫자여야 합니다: "2.5"');
  });

  test("유효한 숫자가 없는 입력", async () => {
    const inputs = ["a,b,c"];
    mockQuestions(inputs);

    const app = new App();
    await expect(app.run()).rejects.toThrow("[ERROR] 입력값에 유효한 숫자가 없습니다.");
  });

  test("공백만 있는 입력", async () => {
    const inputs = ["   "];
    mockQuestions(inputs);

    const app = new App();
    await expect(app.run()).resolves.toBeUndefined(); // 0 반환, 에러 아님
  });

  test("공백으로만 이루어진 숫자", async () => {
    const inputs = [" , , "];
    mockQuestions(inputs);

    const app = new App();
    await expect(app.run()).rejects.toThrow("[ERROR] 입력값에 유효한 숫자가 없습니다.");
  });

  test("커스텀 구분자와 함께 음수 입력", async () => {
    const inputs = ["//;\n1;2;-3"];
    mockQuestions(inputs);

    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR] 입력값은 자연수만 허용됩니다: "-3"');
  });

  test("커스텀 구분자와 함께 소수 입력", async () => {
    const inputs = ["//;\n1;2;3.5"];
    mockQuestions(inputs);

    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR] 입력값은 숫자여야 합니다: "3.5"');
  });
});
