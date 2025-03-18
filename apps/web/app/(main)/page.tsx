import Slicer from "@/components/layout/Slicer";
import Hero from "@/components/pages/home/Hero";
import ProjectList from "@/components/ui/project/ProjectList";

export default function Page() {
  return (
    <>
      <Slicer>
        <Hero />
        <ProjectList />
      </Slicer>
    </>
  );
}
