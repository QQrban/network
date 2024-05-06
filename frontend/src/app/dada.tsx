import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie;
  const isAuth = cookies && cookies.includes("sonesess=");

  return {
    props: {
      isAuth,
    },
  };
};
