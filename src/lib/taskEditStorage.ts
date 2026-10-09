const EDITED_TITLES_KEY = "taskflow.editedTitles";

type EditedTitles = Record<string, string>;

function readEditedTitles(): EditedTitles {
  try {
    const raw = localStorage.getItem(EDITED_TITLES_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeEditedTitles(titles: EditedTitles) {
  localStorage.setItem(EDITED_TITLES_KEY, JSON.stringify(titles));
}

export const taskEditStorage = {
  getTitle(id: string): string | null {
    return readEditedTitles()[String(id)] ?? null;
  },

  setTitle(id: string, title: string) {
    const titles = readEditedTitles();
    titles[String(id)] = title;
    writeEditedTitles(titles);
  },

  removeTitle(id: string) {
    const titles = readEditedTitles();
    delete titles[String(id)];
    writeEditedTitles(titles);
  },

  apply<T extends { id?: string; _id?: string; title: string }>(tasks: T[]): T[] {
    const editedTitles = readEditedTitles();

    return tasks.map((task) => {
      const id = String(task.id ?? task._id ?? "");
      const savedTitle = id ? editedTitles[id] : undefined;

      return savedTitle ? { ...task, title: savedTitle } : task;
    });
  },
};
