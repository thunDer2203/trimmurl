import Image from "next/image";
// import localFont from "next/font/local";
import Link from "next/link";



// const poppins = localFont({
//   src: "./fonts/Poppins-ExtraBold.ttf",
//   variable: "--font-poppins",
//   weight: "100 900",
// });

export default function Home() {
  return (
    <main className="bg-cyan-200">
      <section className="grid grid-cols-2 h-[50vh]">
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className={`text-3xl font-bold `}>
            The best URL shortener in the Market
          </p>
          <p className=" text-center">
            We are the most straightfoward URL Shortener in the world. Most of the url shorteners will track you or ask you to give your details for login. We understand your needs and hence we have created this URL shortener
          </p>
          <div className='flex gap-3 justify-start'>
          <Link href="/shorten"><button className='bg-cyan-800 rounded-lg shadow-lg p-3 py-1 font-bold text-white cursor-pointer'>Try Now</button></Link>
          <Link href="/github"><button className='bg-cyan-800 rounded-lg shadow-lg p-3 py-1 font-bold text-white cursor-pointer'>GitHub</button></Link>
        </div>
        </div>
        <div className=" flex justify-start relative">
          <Image className="mix-blend-darken" alt="an Image of a vector" src={"/vector.jpg"} fill={true}    />
        </div>

      </section>
    </main>
  );
}