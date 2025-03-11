import { type FC } from "react";
import Wrapper from "@/components/layout/Wrapper";
import Card from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
interface ProjectCardProps {}

const ProjectCard: FC<ProjectCardProps> = ({}) => {
  return (
    <Wrapper>
      <Card className="group">
        <div
          style={{
            backgroundImage: `radial-gradient(
                circle at 50% 0,
                ${"#3FA9F57a"},
                rgba(0, 0, 0, 0) 80%
            ),
            radial-gradient(circle at 50% 0, #0000007a, rgba(0, 0, 0, 0))`,
          }}
          className="absolute left-0 right-0 top-0 h-full overflow-hidden opacity-0 transition-opacity group-hover:opacity-100"
        />
        <Link
          href={`/about`}
          className=" block space-y-16 p-4 pb-0 md:p-10 md:pb-0 relative"
        >
          <div className="flex items-center justify-between gap-10">
            <div className="space-y-2">
              <h4 className="text-base md:text-lg">Traviio Tours</h4>
              <p className="text-xs dark:text-white/50 md:text-sm text-black/50">
                <span className="dark:text-white text-black">
                  Tour Booking System, '24
                </span>{" "}
                — Guided tours tailored by local experts
              </p>
            </div>
            <ArrowRight className="size-6 transition-transform duration-500 md:group-hover:translate-x-5" />
          </div>

          <Image
            src={
              "https://res.cloudinary.com/dkujhhn6j/image/upload/v1729959313/projects/tra_qmgxmb.jpg"
            }
            className="w-full rounded-xl shadow-2xl drop-shadow-2xl transition-transform duration-500 group-hover:translate-y-0 md:translate-y-10"
            alt="Project Image"
            width={1000}
            height={1000}
            priority
            loading="eager"
          />
        </Link>
      </Card>
    </Wrapper>
  );
};

export default ProjectCard;
