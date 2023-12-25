import { useMemo } from "react";
import Debtor, { debtorIdGenerator } from "./debtor";
import { FormValues } from "./formTypes";

const useLoanProjection = (values: FormValues) => {
  return useMemo(() => {
    debtorIdGenerator.reset();
    let cashInHand = values.capital;
    let numOfDebtors = 0;
    let outStandingLoans = 0;
    let debtors: Debtor[] = [];
    const result: any = {};
    for (let week = 1; week <= values.stopProjectionAtWeek; week++) {
      const cashAtStartOfWeek = cashInHand;
      const numberOfDebtorsAtStartOfWeek = numOfDebtors;
      const outStandingLoansAtStartOfWeek = outStandingLoans;
      let processingFees = 0;
      let formFees = 0;

      debtors = debtors.filter((v) => {
        const isDone = v.isDone();
        if (isDone) {
          numOfDebtors--;
          return false;
        }
        return true;
      });

      debtors.forEach((d) => d.incrementWeeksInDebt());
      let numOfDisbursements = 0;

      if (week < values.stopDisbursementAtWeek) {
        numOfDisbursements = Math.floor(cashInHand / values.disbursement);
        for (let i = 0; i < numOfDisbursements; i++) {
          debtors.push(new Debtor(values.weeklyRepayment, values.loanDuration, values.gracePeriod));
          processingFees += values.processingFee;
          formFees += values.formFee;
        }
      }

      numOfDebtors += numOfDisbursements;
      const cashAfterDisbursement = cashAtStartOfWeek - numOfDisbursements * values.disbursement;

      const totalRepayment = debtors.map((r) => r.repay()).reduce((a, c) => a + c, 0);
      const newOutStandingLoans = debtors.map((r) => r.calOutstandingLoanForNewDebtor()).reduce((a, c) => a + c, 0);
      const oldOutStandingLoans = debtors.map((r) => r.calOutstandingLoanForOldDebtor()).reduce((a, c) => a + c, 0);

      cashInHand = cashAfterDisbursement + totalRepayment + processingFees + formFees - values.estimatedWeeklyExpenses;
      outStandingLoans = newOutStandingLoans + oldOutStandingLoans;

      const debtorInfo: any = {};
      debtors.forEach((d) => {
        const { id, ...info } = d.info();
        debtorInfo[`debtor-${id}`] = info;
      });

      result[`week-${week}`] = {
        cashAtStartOfWeek,
        numberOfDebtorsAtStartOfWeek,
        outStandingLoansAtStartOfWeek,
        projectedCapitalAtStartOfWeek: cashAtStartOfWeek + outStandingLoansAtStartOfWeek,
        numOfDisbursements,
        processingFees,
        formFees,
        newOutStandingLoans,
        totalRepayment,
        oldOutStandingLoans: oldOutStandingLoans,
        numOfDebtorsAtEndOfWeek: numOfDebtors,
        outStandingLoansAtEndOfWeek: outStandingLoans,
        weeklyExpenses: values.estimatedWeeklyExpenses,
        cashAtEndOfWeek: cashInHand,
        projectedCapitalAtEndOfWeek: cashInHand + outStandingLoans,
        debtors: debtorInfo,
      };
    }
    return result;
  }, [values]);
};

export default useLoanProjection;
