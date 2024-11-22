"use client";

import { supabase } from "@/lib/supabase";

import { useParams, useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui";

import { useToast } from "@/hooks/use-toast";

type AlertPopupProps = {
  children: React.ReactNode;
};

function AlertPopup({ children }: AlertPopupProps) {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const handleDeleteTask = async () => {
    try {
      const { status, error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id);

      if (error) throw new Error(error.message);

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
        title: "에러가 발생했습니다.",
        description: "예상치 못한 에러가 발생했습니다.",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            해당 TASK를 정말로 삭제하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription>
            이 작업이 실행되면 다시 취소할 수 없습니다.
            <br /> 삭제가 진행되면 귀하의 게시물은 영구적으로 삭제됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-rose-600"
            onClick={handleDeleteTask}
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { AlertPopup };
