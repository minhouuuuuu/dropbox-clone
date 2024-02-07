import { SignIn, SignInButton, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggler } from "./ThemeToggler"
import { ArrowRight } from "lucide-react"


const Header = () => {
  return (
    <header className="flex items-center justify-between">
      	<Link href="/" className="flex items-center space-x-2"> 
			<div className="bg-[#0160FE] w-fit">
				<Image 
					src="https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png"
					alt="logo"
					className="invert"
					height={50}
					width={50}
				/>
			</div>
			<h1 className="font-bold text-xl">Dropbox</h1>
      	</Link>

		<div className="px-5 flex space-x-2 items-center">
			<ThemeToggler />

			<UserButton afterSignOutUrl="/" />

			<SignedOut>
				<SignInButton afterSignInUrl="/dashboard" mode="modal">
					<div className="flex cursor-pointer bg-blue-500 px-4 py-2.5 w-fit text-white font-bold justify-center items-center mx-auto">
						Get Started
						<ArrowRight className="ml-4"/>
					</div>
				</SignInButton>
			</SignedOut>
		</div>
    </header>
  )
}

export default Header