import Link from "next/link";

export default function LoginPage() {
    return(
        <section className= "dark:bg-black flex justitfy-center items-center h-screen">
            <div className="w-80 items-center justify-center mx-auto">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold text-white text-center">
                        Sign in
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="block md-2 text-sm font-medium text-gray-900 dark:text-white">
                                Email
                            </label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@comapany.com"
                                //value={username}
                                //onChange={handleUsername}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Password
                            </label>
                            <input 
                                type="text"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                //value={password}
                                //onChange={handlePassword}
                            />
                        </div>
                        <button type="submit" className="w-full text-red-600 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-500">Login</button>
                    </form>
                    <div>
                        <p className="text-sm font-medium text-white dark:text-white-400">
                            Don't have and account? <Link href="/signup" className="font-medium text-red-600 hover:underline dark:text-primary-500"> Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}