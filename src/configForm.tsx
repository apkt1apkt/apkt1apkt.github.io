import { Button, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { FormValues } from "./formTypes";

export default function ConfigForm({ setFormData }: { setFormData: (values: FormValues | null) => void }) {
  const [values, setValues] = useState<FormValues>({
    capital: 3000,
    stopProjectionAtWeek: 20,
    stopDisbursementAtWeek: 16,
    disbursement: 2000,
    loanDuration: 4,
    weeklyInterestRate: 10,
    weeklyRepayment: 0,
    processingFee: 200,
    formFee: 50,
    gracePeriod: 1,
    estimatedWeeklyExpenses: 200,
  });

  useEffect(() => {
    const localStore = localStorage.getItem("formValues");
    if (localStore) {
      try {
        const data = JSON.parse(localStore);
        console.log(data);
        setValues(data);
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  useEffect(() => {
    setValues((v) => ({
      ...v,
      weeklyRepayment: (1 + v.weeklyInterestRate / 100) * (v.disbursement / v.loanDuration),
    }));
  }, [values.weeklyInterestRate, values.loanDuration, values.disbursement]);

  const onChange = (key: string) => (value: number | null) => {
    setValues((v) => ({
      ...v,
      [key]: value as any,
    }));
    setFormData(null);
  };

  const onSubmit = () => {
    localStorage.setItem("formValues", JSON.stringify(values));
    setFormData(values);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <InputNumber addonBefore="Capital" value={values.capital} onChange={onChange("capital")} step={1000} />
      <InputNumber
        addonBefore="Stop projection after week"
        min={0}
        value={values.stopProjectionAtWeek}
        onChange={onChange("stopProjectionAtWeek")}
      />
      <InputNumber
        addonBefore="Stop disbursement after week"
        min={0}
        value={values.stopDisbursementAtWeek}
        onChange={onChange("stopDisbursementAtWeek")}
      />
      <InputNumber addonBefore="Disbursement" min={0} value={values.disbursement} onChange={onChange("disbursement")} />
      <InputNumber
        addonBefore="Repay loan in"
        min={0}
        value={values.loanDuration}
        onChange={onChange("loanDuration")}
        addonAfter="weeks"
      />
      <InputNumber
        addonBefore="Weekly interest rate"
        value={values.weeklyInterestRate}
        onChange={onChange("weeklyInterestRate")}
        min={0}
        max={100}
        formatter={(value) => `${value}%`}
        parser={(value) => value!.replace("%", "") as any}
      />
      <InputNumber
        addonBefore="Weekly repayment"
        onChange={onChange("weeklyRepayment")}
        min={0}
        readOnly
        value={values.weeklyRepayment}
        step={50}
      />
      <InputNumber
        addonBefore="Start repayment after"
        addonAfter="Weeks"
        value={values.gracePeriod}
        onChange={onChange("gracePeriod")}
      />
      <InputNumber
        addonBefore="Processing fee"
        min={0}
        value={values.processingFee}
        onChange={onChange("processingFee")}
        step={50}
      />
      <InputNumber addonBefore="Form fee" step={50} min={0} value={values.formFee} onChange={onChange("formFee")} />
      <InputNumber
        addonBefore="Estimated weekly expenses"
        min={0}
        value={values.estimatedWeeklyExpenses}
        onChange={onChange("estimatedWeeklyExpenses")}
      />
      <Button type="primary" onClick={onSubmit}>
        Project
      </Button>
    </div>
  );
}
