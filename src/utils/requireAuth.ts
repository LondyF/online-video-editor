import type { NextPageContext } from "next";
import { getSession } from "next-auth/react";

type Options = {
  redirectUrl?: string;
};

const requireAuth = async (context: NextPageContext, options?: Options) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: options?.redirectUrl || "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default requireAuth;
