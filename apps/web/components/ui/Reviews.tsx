import { reviews } from "@/data/reviews";
import Wrapper from "../layout/Wrapper";

const Reviews = () => (
  <Wrapper>
    <div className="mb-8 space-y-2 text-center">
      <h1 className="glowing text-2xl font-medium md:text-4xl">
        Client Testimonials That Speak{" "}
        <span className="linear italic">Volumes</span>
      </h1>
      <p className="text-sm text-white/50 md:text-base">
        Dive into a Tapestry of Experiences Shared by Those Who Walked the
        Journey with Me — Where Satisfaction Finds Its Voice
      </p>
    </div>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {reviews.map((review, index) => (
        <div key={index}>
          <h1>{review.content}</h1>
        </div>
      ))}
    </div>
  </Wrapper>
);

export default Reviews;
