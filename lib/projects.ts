import type { Project, ProjectStatus } from "./types";

export const STATUS_DISPLAY_ORDER: Record<ProjectStatus, number> = {
  finished: 0,
  ongoing: 1,
  delayed: 2,
};

function yearOf(project: Project): number {
  const parsed = parseInt(project.year, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function sortProjectsForDisplay(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const byStatus = STATUS_DISPLAY_ORDER[a.status] - STATUS_DISPLAY_ORDER[b.status];
    if (byStatus !== 0) return byStatus;
    const byYear = yearOf(b) - yearOf(a);
    if (byYear !== 0) return byYear;
    return a.position - b.position;
  });
}
