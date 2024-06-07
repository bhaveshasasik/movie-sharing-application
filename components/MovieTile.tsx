import Image from "next/image";
import Link from "next/link";




export default function MovieTile(props: { title: string, imageUrl: string }) {
  return (
    <div className=" flex flex-col text-center mr-4 mb-4 ml-5 mt-5  ">
      <Link href="/movie"> <Image src={props.imageUrl} alt={props.title} width={150} height={150} style={{  borderRadius: '8px' }} /> </Link>
      <div className="m1-4">
        <div className="text-black md:border-0 font-serif antialiased rounded md:bg-transparent">{props.title}</div>
      </div>
    </div>
  );
}
