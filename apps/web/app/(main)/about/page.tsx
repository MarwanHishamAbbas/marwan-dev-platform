import Slicer from "@/components/layout/Slicer";
import Wrapper from "@/components/layout/Wrapper";
import Hero from "@/components/pages/home/Hero";
import ProjectList from "@/components/ui/project/ProjectList";

export default function Page() {
  return (
    <Slicer>
      About Page
      <ProjectList />
    </Slicer>
  );
}
