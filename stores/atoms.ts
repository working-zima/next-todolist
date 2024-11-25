import { atom } from "jotai";

import { Task } from "@/types";

export const tasksAtom = atom<Task[]>([]);

export const taskAtom = atom<Task | null>(null);
