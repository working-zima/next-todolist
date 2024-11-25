import { useAtom } from "jotai";

import { supabase } from "@/lib/supabase";

import { toast } from "@/hooks/use-toast";

import { taskAtom } from "@/stores/atoms";

import { useEffect } from "react";

function useGetTaskById(taskId: number) {
  const [task, setTask] = useAtom(taskAtom);

  const getTaskById = async () => {
    try {
      const { data, status, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("id", taskId);

      if (error) {
        toast({
          variant: "destructive",
          title: "에러가 발생했습니다.",
          description: `Supabase task 조회 오류: ${
            error.message || "알 수 없는 에러"
          }`,
        });
      }

      if (data !== null && status === 200) setTask(data[0] || []);
    } catch (err) {
      console.error(err);

      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });
    }
  };

  useEffect(() => {
    if (taskId) getTaskById();
  }, [taskId]);

  return { task, getTaskById };
}

export { useGetTaskById };
