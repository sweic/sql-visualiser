import { useMonaco } from "@monaco-editor/react";
import React, { useEffect } from "react";
import * as mysql from "../utils/mysql";
export const useSQLMonaco = () => {
  const monaco = useMonaco();
  useEffect(() => {
    if (monaco) {
      monaco.languages.register({ id: "mysql" });
      monaco.languages.setLanguageConfiguration("mysql", mysql.conf);
      monaco.languages.setMonarchTokensProvider("mysql", mysql.language);
    }
  }, [monaco]);
};
