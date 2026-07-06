import VerifyEmail from "./VerifyEmail";

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const code = params.code;


  return (
    <>
      <section className="w-full max-h-screen h-full flex justify-center items-center ">
        <VerifyEmail code={code} />
      </section>
    </>
  );
};

export default page;
