import ConfigForm from "./configForm";
import "./App.css";
import { useState } from "react";
import FormJsonPresentation from "./FormJsonPresentation";
import { FormValues } from "./formTypes";

function App() {
  const [formData, setFormData] = useState<FormValues | null>(null);

  return (
    <div className="grid-container">
      <div className="column">
        <ConfigForm setFormData={setFormData} />
      </div>
      <div className="column">{formData && <FormJsonPresentation formData={formData} />}</div>
    </div>
  );
}

export default App;
