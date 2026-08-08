import type { Project } from "../types";
import { FC } from "react";

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader: FC<ProjectHeaderProps> = ({ project }) => {
  return (
    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
      {project.title}
    </h1>
  );
};

export default ProjectHeader;