"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

import { nanoid } from "nanoid";

import { Button, LabelDatePicker, Progress } from "@/components/ui";
import { AlertPopup } from "@/components/common";
import { BoardCard } from "@/components/common/board-card/BoardCard";

import { Board, Task } from "@/types";

import { useToast } from "@/hooks/use-toast";

import { ChevronLeft } from "@/public/assets/icons";

import { supabase } from "@/lib/supabase";

import styles from "./page.module.scss";

function BoardPage() {
  const { id } = useParams();
  const { toast } = useToast();

  const [task, setTask] = useState<Task>();
  const [boards, setBoards] = useState<Board[]>([]);

  const getTask = async () => {
    try {
      const { data, status, error } = await supabase
        .from("todos")
        .select("*")
        .eq("id", id);

      if (error) throw new Error(error.message);
      if (data !== null && status === 200) setBoards(data[0].boards || []);
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "에러가 발생했습니다.",
        description: "예상치 못한 에러가 발생했습니다.",
      });
    }
  };

  const handleCreateBoard = () => {
    const newBoard: Board = {
      id: nanoid(),
      title: "",
      startDate: null,
      endDate: null,
      content: "",
      isCompleted: false,
    };

    setBoards([...boards, newBoard]);
    updateSingleTaskColumnById(Number(id), "boards", [...boards, newBoard]);
  };

  const updateSingleTaskColumnById = async <T,>(
    uid: number,
    column: string,
    newValue: T
  ) => {
    try {
      const { status, error } = await supabase
        .from("todos")
        .update({ [column]: newValue })
        .eq("id", uid)
        .select();

      if (status === 204) {
        toast({
          title: "새로운 TODO-BOARD를 생성했습니다.",
          description: "생성한 TODO-BOARD에 TODO를 입력해 주세요.",
        });
      }
      if (error) throw new Error(error.message);
      getTask();
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "에러가 발생했습니다.",
        description: "업데이트 하던중 예상치 못한 에러가 발생했습니다.",
      });
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <>
      <div className={styles.header}>
        <div className={styles[`header__btn-box`]}>
          <Button variant={"outline"} size={"icon"}>
            <ChevronLeft />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant={"secondary"}>저장</Button>
            <AlertPopup>
              <Button className="text-rose-600 bg-red-50 hover:bg-rose-50">
                삭제
              </Button>
            </AlertPopup>
          </div>
        </div>
        <div className={styles.header__top}>
          {/* 제목 입력 Input 섹션 */}
          <input
            type="text"
            placeholder="Enter Title Here!"
            className={styles.header__top__input}
          />
          {/* 진행상황 척도 그래프 섹션 */}
          <div className="flex items-center justify-start gap-4">
            <small className="text-sm font-medium leading-none text-[#6D6D6D]">
              1/10 Completed
            </small>
            <Progress className="w-60 h-[10px]" value={33} />
          </div>
        </div>
        {/* 캘린더 + Add New Board 버튼 섹션 */}
        <div className={styles.header__bottom}>
          <div className="flex items-center gap-5">
            <LabelDatePicker label={"From"} />
            <LabelDatePicker label={"To"} />
          </div>
          <Button
            className="text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg"
            onClick={handleCreateBoard}
          >
            Add New Board
          </Button>
        </div>
      </div>
      <div className={styles.body}>
        {boards.length !== 0 ? (
          <div className={styles.body__isData}>
            {boards.map((board: Board) => (
              <BoardCard key={board.id} />
            ))}
          </div>
        ) : (
          <div className={styles.body__noData}>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              There is no board yet.
            </h3>
            <small className="text-sm font-medium leading-none text-[#6D6D6D] mt-3 mb-7">
              Click the button and start flashing!
            </small>
            <button onClick={handleCreateBoard}>
              <Image
                src="/assets/images/button.svg"
                width={74}
                height={74}
                alt="rounded-button"
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default BoardPage;
