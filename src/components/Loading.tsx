import { NewtonsCradle } from "ldrs/react";
import "ldrs/react/NewtonsCradle.css";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-body-background">
      <NewtonsCradle size="78" speed="1.4" color="white" />
    </div>
  );
}
