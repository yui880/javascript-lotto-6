import InputView from '../view/InputView.js';
import Validator from '../validator/Validator.js';
import { CONSTANT, SYMBOL } from '../constants/Constant.js';
import LottoBundle from '../model/LottoBundle.js';
import OutputView from '../view/OutputView.js';
import Lotto from '../model/Lotto.js';

class LottoGame {
  #lottoBundle;

  async startGame() {
    const lottoCount = await this.#getLottoCount();

    this.#lottoBundle = new LottoBundle();
    this.#lottoBundle.buyLottos(lottoCount);
    OutputView.printLottoNumbers(lottoCount, this.#lottoBundle.getTotalLottoNumberString());

    const winningNumbers = await this.#getWinningNumbersInput();
    const bonusNumber = await this.#getBonusNumberInput();
  }

  async #getLottoCount() {
    try {
      const amount = await InputView.readAmount();
      Validator.validateAmount(amount);

      return amount / CONSTANT.amountUnit;
    } catch (error) {
      OutputView.printMessage(error.message);

      return this.#getLottoCount();
    }
  }

  async #getWinningLotto() {
    try {
      const winningNumbers = await InputView.readWinningNumbers();
      const splitWinningNumbers = this.#getSplitWinningNumbers(winningNumbers);

      return new Lotto(splitWinningNumbers);
    } catch (error) {
      OutputView.printMessage(error.message);

      return this.#getWinningLotto();
    }
  }

  #getSplitWinningNumbers(winningNumbers) {
    return winningNumbers.split(SYMBOL.comma).map((number) => number.trim());
  }

  async #getBonusNumber() {
    try {
      const bonusNumber = await InputView.readBonusNumber();
      Validator.validateBonusNumber(bonusNumber);

      return Number(bonusNumber);
    } catch (error) {
      OutputView.printMessage(error.message);

      return this.#getBonusNumber();
    }
  }
}

export default LottoGame;
