import { Chart1 } from "@/components/Chart1";

export default function Home() {
  return (
    <>
      <div className="flex justify-start items-center gap-3">
        <p className="text-gray-700 text-3xl mb-5 mt-5 font-bold">Dashboard</p>
      </div>
      <div className="flex gap-[2.25rem] bg-white h-[23rem]">
        <Chart1 />
      </div>
    </>
  );
}