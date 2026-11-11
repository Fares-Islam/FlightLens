import { useEffect } from "react";

export function handleLocalData(vars: Record<string, any>) {
  for (const [varName, varValue] of Object.entries(vars)) {
    useEffect(() => {
      localStorage.setItem(varName, String(varValue));
    }, [vars[varName]]);
  }
}
