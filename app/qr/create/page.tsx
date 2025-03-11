import { Suspense } from "react";
import CreateStaticQRCode from "./static";

const Page = () => {
  return (
    <Suspense>
      <section style={{ height: "calc(100vh - 70px)" }}>
        <CreateStaticQRCode />
      </section>
    </Suspense>
  );
};

export default Page;
