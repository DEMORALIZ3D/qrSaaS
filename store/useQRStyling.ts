import { defaultOpts } from "@/lib/qr";
import { deepMergeAndUpdate } from "@/lib/utils";
import QRCodeStyling, { Options } from "qr-code-styling";
import { RefObject, createRef } from "react";
import { create } from "zustand";

const useQRStylingStore = create<{
  store: Options;
  ui: {
    ref: RefObject<QRCodeStyling | null>;
  };
}>((set) => ({
  store: defaultOpts,
  ui: {
    ref: createRef(),
  },
  actions: {
    setStore: (category: keyof Options, value: Partial<Options>) =>
      set((state) => deepMergeAndUpdate(state, { [category]: value })),
    setRef: (ref: RefObject<QRCodeStyling>) => set({ ui: { ref: ref } }),
  },
}));

export default useQRStylingStore;
