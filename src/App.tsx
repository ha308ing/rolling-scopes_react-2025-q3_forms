import { useState } from "react";
import "./App.css";
import Modal from "./common/Modal";
import Button from "./ui/Button";
import UncontrolledForm from "./features/Forms/UncontrolledForm";
import RhfForm from "./features/Forms/RhfForm";
import Output from "./features/Forms/Output";

function App() {
  const [selectedForm, setSelectedForm] = useState<
    "rhf" | "uncontrolled" | null
  >(null);

  const form =
    selectedForm === "uncontrolled" ? (
      <UncontrolledForm onSuccessfulSubmit={() => setSelectedForm(null)} />
    ) : (
      <RhfForm onSuccessfulSubmit={() => setSelectedForm(null)} />
    );

  return (
    <>
      <main className="min-w-[500px] w-[50vw] pt-6 mx-auto">
        <div className="flex items-center justify-around gap-4 px-6 mb-6">
          <Button
            onClick={() => setSelectedForm("rhf")}
            className={`${selectedForm === "rhf" ? "bg-red-500" : "initial"}`}
          >
            react-hook-form form
          </Button>
          <Button
            onClick={() => setSelectedForm("uncontrolled")}
            className={`${selectedForm === "uncontrolled" ? "bg-red-500" : "initial"}`}
          >
            uncontrolled form
          </Button>
        </div>
        <Output />
      </main>
      {selectedForm && (
        <Modal closeHandler={() => setSelectedForm(null)}>{form}</Modal>
      )}
    </>
  );
}

export default App;
