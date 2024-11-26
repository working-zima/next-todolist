export type Task = {
  id: number;
  title: string | null;
  start_date: Date;
  end_date: Date;
  boards: Board[];
};

export type Board = {
  id: string;
  title: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  content: string;
  isCompleted: boolean;
};
