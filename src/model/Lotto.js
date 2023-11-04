import Validator from '../validator/Validator.js';
import { LOTTO_NUMBER, RANK } from '../constants/Constant.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = this.#sortNumbers(numbers.map((number) => Number(number)));
  }

  #validate(numbers) {
    Validator.validateLotto(numbers);
  }

  #sortNumbers(numbers) {
    return numbers.sort((first, second) => first - second);
  }

  getNumberString() {
    return `[${this.#numbers.join(', ')}]`;
  }

  getMatchingCount(winningLotto, bonusNumber) {
    const matchingCount = this.#countMatchingNumbers(winningLotto);
    return matchingCount;
  }

  #countMatchingNumbers(winningLotto) {
    return 2 * LOTTO_NUMBER.count - new Set([winningLotto.#numbers, ...this.#numbers]).size;
  }
}

export default Lotto;
