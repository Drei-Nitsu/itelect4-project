import ProjectHeader from "../components/ProjectHeader";
import { mockProject } from "../data/mockData";

function ProjectPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Project</h2>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <ProjectHeader project={mockProject} />
        <p className="mt-4 text-gray-700 dark:text-gray-300">{mockProject.description}</p>
      </div>
    </div>
  );
}

export default ProjectPage;
