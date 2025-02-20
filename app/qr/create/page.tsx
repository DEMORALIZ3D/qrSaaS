import CreateStaticQRCode from "./static";

const Page = () => {
  return (
    <section style={{ height: "calc(100vh - 70px)" }}>
      <CreateStaticQRCode />
    </section>
  );
};

export default Page;
