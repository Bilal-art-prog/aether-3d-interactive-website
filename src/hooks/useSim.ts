import { useSyncExternalStore } from "react";
import { getUiVersion, sim, subscribe } from "@/store/experience";

export function useSimUi() {
  useSyncExternalStore(subscribe, getUiVersion, getUiVersion);
  return sim.ui;
}
