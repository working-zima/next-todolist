"use client";

import { Button } from "@/components/ui";

import { useCreateTask } from "@/hooks/api";

function HomePage() {
  /** Add New Page 버튼을 클릭 했을 때 TASK 생성 */
  const handleCreateTask = useCreateTask();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5 mb-6">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          사용법:
        </h3>
        <div className="flex flex-col items-center gap-3">
          <small className="text-sm font-normal leading-none">
            1. Create a page
          </small>
          <small className="text-sm font-normal leading-none">
            2. Add boards to page
          </small>
        </div>
      </div>
      <Button
        className="text-[#E79057] bg-transparent border border-[#E79057] hover:bg-[#FFF9F5] w-[180px]"
        onClick={handleCreateTask}
      >
        Add New Page
      </Button>
    </div>
  );
}

export default HomePage;
