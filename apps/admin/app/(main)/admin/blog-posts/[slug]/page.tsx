import { type FC } from "react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const Page: FC<PageProps> = async ({ params }) => {
  const { slug } = await params;
  return <div>{slug}</div>;
};

export default Page;
