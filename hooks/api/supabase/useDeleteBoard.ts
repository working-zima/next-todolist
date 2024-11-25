import { useAtom } from "jotai";

import { Board } from "@/types";

import { toast } from "@/hooks/use-toast";
import { useGetTaskById } from "./useGetTaskById";

import { supabase } from "@/lib/supabase";
import { taskAtom } from "@/stores/atoms";

function useDeleteBoard(taskId: number, boardId: string) {
  const [task] = useAtom(taskAtom);
  const { getTaskById } = useGetTaskById(taskId);

  const deleteBoard = async () => {
    try {
      const { status, error } = await supabase
        .from("tasks")
        .update({
          boards: task?.boards.filter((board: Board) => board.id !== boardId),
        })
        .eq("id", taskId);

      if (error) {
        toast({
          variant: "destructive",
          title: "에러가 발생했습니다.",
          description: `Supabase board 삭제 오류: ${
            error.message || "알 수 없는 에러"
          }`,
        });
      }

      if (status === 204) {
        toast({
          title: "선택한 BOARD가 삭제되었습니다.",
          description: "새로운 TODO-BOARD를 생성해보세요.",
        });
        getTaskById();
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

  return deleteBoard;
}

export { useDeleteBoard };
