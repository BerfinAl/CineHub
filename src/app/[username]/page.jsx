import { getUser } from "@/lib/data";

const Page = async ({ params }) => {

  const { username } = params;

  const user = await getUser(username);

  return <h1>{` hello ${username}`}</h1>;

  // return <UserPage user={data} />;
};

export default Page;
