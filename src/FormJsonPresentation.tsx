import ReactJson from "react-json-view";
import { FormValues } from "./formTypes";
import useLoanProjection from "./useLoanProjection";

export default function FormJsonPresentation({ formData }: { formData: FormValues }) {
  const data = useLoanProjection(formData);
  return (
    <div>
      <ReactJson src={data || {}} name={false} displayDataTypes={false} displayObjectSize={false} collapsed={1} />
    </div>
  );
}
