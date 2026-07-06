import { ErrorForm } from "../../../components/UI/ErrorForm";


const page = async ({ searchParams }) => {
  const params = await searchParams;
  const email = params.email;
  const type = params.type;
  return (
    <>
      <section className="w-full max-h-screen h-full flex justify-center items-center ">
        <ErrorForm email={email} type={type} />
      </section>
    </>
  );
};

export default page;
