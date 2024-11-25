import { useRouter } from "next/navigation";

import { useSetAtom } from "jotai";
import { supabase } from "@/lib/supabase";

import { useToast } from "@/hooks/use-toast";

import { tasksAtom } from "@/stores/atoms";

function useCreateTask() {
  const { toast } = useToast();
  const router = useRouter();

  const setTasks = useSetAtom(tasksAtom);

  const createTask = async () => {
    try {
      const { data, status, error } = await supabase
        .from("todos")
        .insert([
          {
            title: null,
            start_date: null,
            end_date: null,
            boards: [],
          },
        ])
        .select();

      if (error) {
        toast({
          variant: "destructive",
          title: "에러가 발생했습니다.",
          description: `Supabase tasks 생성 오류: ${
            error.message || "알 수 없는 에러"
          }`,
        });
      }

      if (status === 201 && data !== null) {
        setTasks((prevTasks) => [...prevTasks, data[0]]);
        toast({
          title: "새로운 TASK가 생성되었습니다.",
          description: "나만의 TODO-BOARD를 생성해보세요.",
        });
        router.push(`/board/${data[0].id}`);
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });
    }
  };

  return createTask;
}

export { useCreateTask };
