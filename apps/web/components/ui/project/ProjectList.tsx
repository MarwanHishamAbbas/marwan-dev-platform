import { type FC } from "react";
import ProjectCard from "./ProjectCard";
import Slicer from "@/components/layout/Slicer";

interface ProjectListProps {}

const ProjectList: FC<ProjectListProps> = ({}) => {
  return (
    <Slicer id="work">
      <ProjectCard />
    </Slicer>
  );
};

export default ProjectList;
