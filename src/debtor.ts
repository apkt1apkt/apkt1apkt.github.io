export default class Debtor {
  private numOfRepayments = 0;
  private gracePeriodUsed = 0;
  private weeksInDebt = 0;
  private debtorId: number;
  private debtPayed = 0;

  constructor(
    private readonly expectedWeeklyPayment: number,
    private readonly expectedNumOfRepayments: number,
    private readonly gracePeriod: number
  ) {
    this.debtorId = debtorIdGenerator.id();
  }

  isDone() {
    return this.numOfRepayments >= this.expectedNumOfRepayments;
  }

  private isInGracePeriod() {
    return this.gracePeriodUsed < this.gracePeriod;
  }

  incrementWeeksInDebt() {
    this.weeksInDebt++;
  }

  private useGracePeriod() {
    this.gracePeriodUsed++;
  }

  repay() {
    if (this.isDone()) return 0;
    if (this.isInGracePeriod()) {
      this.useGracePeriod();
      return 0;
    }
    this.numOfRepayments++;
    this.debtPayed += this.expectedWeeklyPayment;
    return this.expectedWeeklyPayment;
  }

  calOutstandingLoan() {
    if (this.isDone()) return 0;
    const outstandingLoan = (this.expectedNumOfRepayments - this.numOfRepayments) * this.expectedWeeklyPayment;
    return outstandingLoan <= 0 ? 0 : outstandingLoan;
  }

  isNewDebtor() {
    return this.weeksInDebt === 0;
  }
  calOutstandingLoanForNewDebtor() {
    return this.isNewDebtor() ? this.calOutstandingLoan() : 0;
  }

  calOutstandingLoanForOldDebtor() {
    return this.isNewDebtor() ? 0 : this.calOutstandingLoan();
  }

  info() {
    return {
      id: this.debtorId,
      numOfRepayments: this.numOfRepayments,
      weeksInDebt: this.weeksInDebt,
      outstandingDebt: this.calOutstandingLoan(),
      debtPayed: this.debtPayed,
    };
  }
}

export const debtorIdGenerator = (() => {
  let id = 0;
  return {
    id: () => ++id,
    reset: () => (id = 0),
  };
})();
