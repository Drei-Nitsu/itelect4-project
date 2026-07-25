import React from "react";
import type { Project } from "../types";
export interface ProjectHeaderProps {
  project: Project;
}
const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
  return (
    <header className="project-header">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </header>
  );
};
export default ProjectHeader;