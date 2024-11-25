"use client";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

import { useAtomValue } from "jotai";
import MarkdownEditor from "@uiw/react-markdown-editor";

import {
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  LabelDatePicker,
  Separator,
} from "@/components/ui";

import { Board } from "@/types";

import { toast } from "@/hooks/use-toast";
import { useCreateBoard } from "@/hooks/api";

import { taskAtom } from "@/stores/atoms";

type MarkdownEditorDialogProps = {
  children: React.ReactNode;
  board: Board;
};

function MarkdownEditorDialog({ children, board }: MarkdownEditorDialogProps) {
  const { id } = useParams();
  const updateBoards = useCreateBoard();

  const task = useAtomValue(taskAtom);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [content, setContent] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    initState();
  };

  const handleInsert = async (boardId: string) => {
    if (!title || !startDate || !endDate) {
      toast({
        variant: "destructive",
        title: "기입되지 않은 곳이 있습니다.",
        description: "수정한 TODO-LIST의 마감일을 꼭 지켜주세요!",
      });
      return;
    }

    try {
      const newBoards = task?.boards.map((board: Board) => {
        if (board.id === boardId) {
          return { ...board, isCompleted, title, startDate, endDate, content };
        }
        return board;
      });

      await updateBoards(Number(id), "boards", newBoards);
      handleCloseDialog();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요.",
      });
    }
  };

  const initState = () => {
    setIsCompleted(board.isCompleted || false);
    setTitle(board.title || "");
    setStartDate(board.startDate ? new Date(board.startDate) : undefined);
    setEndDate(board.endDate ? new Date(board.endDate) : undefined);
    setContent(board.content || "");
  };

  useEffect(() => {
    initState();
  }, [board]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col">
          <DialogTitle>
            <div className="flex items-center justify-start gap-2">
              {/* 체크박스 */}
              <Checkbox
                className="h-5 w-5 min-w-5"
                checked={isCompleted}
                onCheckedChange={(checked) => {
                  if (typeof checked === "boolean") {
                    setIsCompleted(checked);
                  }
                }}
              />
              {/* 제목 */}
              <input
                type="text"
                placeholder="게시물의 제목을 입력하세요."
                className="w-full text-xl outline-none bg-transparent"
                value={title}
                onChange={(event) => setTitle(event?.target.value)}
              />
            </div>
          </DialogTitle>
          <DialogDescription>TODO-BOARD를 작성하세요.</DialogDescription>
        </DialogHeader>
        {/* 캘린더 박스 */}
        <div className="flex items-center gap-5">
          <LabelDatePicker
            label={"From"}
            value={startDate}
            onChange={setStartDate}
          />
          <LabelDatePicker label={"To"} value={endDate} onChange={setEndDate} />
        </div>
        <Separator />
        {/* 마크다운 에디터 UI 영역 */}
        <MarkdownEditor
          className="h-[320px]"
          value={content}
          onChange={setContent}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              variant={"outline"}
              onClick={handleCloseDialog}
            >
              취소
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg"
            onClick={() => handleInsert(board.id)}
          >
            등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { MarkdownEditorDialog };
