
import { atom } from "recoil";

export interface Errors {
  errors: string;
}

export const errorAtom = atom<Errors | null>({
  key: "errorAtom",
  default: null,
});
