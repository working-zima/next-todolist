import { atomWithStorage } from "jotai/utils";

import { User } from "./type";

export const userAtom = atomWithStorage<User | null>("user", null);
