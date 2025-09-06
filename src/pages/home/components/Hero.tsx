import Star from "./Star";
import { GoogleLogin } from '@react-oauth/google';

export default function Hero() {

    const handleSignIn = () => {

    }

    return (
        <section className='h-screen w-screen relative bg-gray-950 -z-10'>
            <div className='fixed h-full w-full left-0 right-0'>
                {
                    Array(50).fill(null).map(() => <Star />)
                }
            </div>
            <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* <GoogleLogin onSuccess={handleLogin} theme="filled_black" /> */}
                <button className="bg-orange-600 px-5 py-2 rounded-md border border-white" onClick={handleSignIn}>Sign In</button>
            </div>
        </section>
    )
}
