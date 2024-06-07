import Link from "next/link";
import Image from "next/image";

export default function About() {
    return(
        <div className="flex flex-col items-center justify-center h-full bg-black text-white">
            <div className="w-full max-w-screen-lg py-8 px-4">
                <h1 className="text-3xl font-semibold rounded mb-4 text-center text-red-600">About Us</h1>
                <p className="text-lg mb-6 rounded block py-2 px-3 text-center">Welcome to our movie sharing platform! We are enthusiastic about bringing movie enthusiasts together to discover, share, and enjoy our favorite films. Our platform provides a seamless experience for users to explore a wide variety of movies, from classic masterpieces to the latest releases. Whether you're a classic viewer or dedicated cinephile, you'll find something to love here. At our core, we believe in the power of storytelling and the magic of cinema to inspire, entertain, and connect people from all walks of life. Join us in this cinematic journey by using our platform!</p>

                <div className="flex flex-col items-left mb-8">
                    <Image src='/martian.jpg' alt="martian" width={450} height={450} className="mb-2" />
                </div>
                <div className="flex flex-col place-items-end mb-8">
                    <Image src='/harrypotter.jpg' alt="harrypotter" width={450} height={450} className="mb-2" />
                </div>

                <div className="flex justify-center">
                    <Link href="/" className="mb-4">
                        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Start Exploring!</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
