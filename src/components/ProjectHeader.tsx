import type { FC } from "react";
import type { Project } from "../types/index.js";

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader: FC<ProjectHeaderProps> = ({ project }) => {
  return (
    <header className="project-header">
      <h2>{project.name}</h2>
      <p>Due: {project.dueDate.toLocaleDateString()}</p>
    </header>
  );
};

export default ProjectHeader;