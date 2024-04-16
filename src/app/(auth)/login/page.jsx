import { auth} from "../../../lib/auth";

import { handleGoogleLogin, handleGitHubLogin } from "@/lib/action";

export default async function LoginPage() {

const session = await auth()


  return (
    <>
      <form action={handleGoogleLogin}>
        <button>Login with Google</button>
      </form>
      <form action={handleGitHubLogin}>
        <button>Login with GitHub</button>
      </form>
    </>
  );
}
