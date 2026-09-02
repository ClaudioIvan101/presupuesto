"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { BuilderState } from "@/types";

const initialBuilderState: BuilderState = {
  step: 1,
  model: "feature",
  project: "",
  client: "",
  scope: "",
  deliverables: [],
  total: 0,
  currency: "USD",
  time: "",
  validity: "15 días",
};

interface AppContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  builderState: BuilderState;
  setBuilderState: React.Dispatch<React.SetStateAction<BuilderState>>;
  isClientModalOpen: boolean;
  setIsClientModalOpen: (open: boolean) => void;
  decisionModal: { isOpen: boolean; title: string; description: string };
  openDecisionModal: (title: string, description: string) => void;
  closeDecisionModal: () => void;
  toastMessage: string | null;
  isToastVisible: boolean;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [builderState, setBuilderState] = useState<BuilderState>(initialBuilderState);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [decisionModal, setDecisionModal] = useState({
    isOpen: false,
    title: "",
    description: "",
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 1900);
  };

  const openDecisionModal = (title: string, description: string) => {
    setDecisionModal({ isOpen: true, title, description });
  };

  const closeDecisionModal = () => {
    setDecisionModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        builderState,
        setBuilderState,
        isClientModalOpen,
        setIsClientModalOpen,
        decisionModal,
        openDecisionModal,
        closeDecisionModal,
        toastMessage,
        isToastVisible,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp debe usarse dentro de AppProvider");
  return context;
}
