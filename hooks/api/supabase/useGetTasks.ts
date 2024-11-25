import { supabase } from "@/lib/supabase";

import { useToast } from "@/hooks/use-toast";
import { useAtom } from "jotai";
import { tasksAtom } from "@/stores/atoms";

function useGetTasks() {
  const { toast } = useToast();

  const [tasks, setTasks] = useAtom(tasksAtom);

  const getTasks = async () => {
    try {
      const { data, status, error } = await supabase.from("todos").select("*");

      if (error) {
        toast({
          variant: "destructive",
          title: "에러가 발생했습니다.",
          description: `Supabase tasks 조회 오류: ${
            error.message || "알 수 없는 에러"
          }`,
        });
      }

      if (data !== null && status === 200) {
        setTasks(data);
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

  return { tasks, getTasks };
}

export { useGetTasks };
