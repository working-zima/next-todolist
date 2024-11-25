import { useParams, useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import { toast } from "@/hooks/use-toast";

function useDeleteTask() {
  const router = useRouter();
  const { id } = useParams();

  const handleDeleteTask = async () => {
    try {
      const { status, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", Number(id));

      if (error) {
        toast({
          variant: "destructive",
          title: "에러가 발생했습니다.",
          description: `Supabase tasks 삭제 오류: ${
            error.message || "알 수 없는 에러"
          }`,
        });
      }

      if (status === 204) {
        toast({
          title: "해당 TASK가 삭제되었습니다.",
          description: "새로운 TASK를 생성해보세요.",
        });
        router.push(`/`);
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

  return handleDeleteTask;
}

export { useDeleteTask };
