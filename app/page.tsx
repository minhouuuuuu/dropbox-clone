import { UserButton } from "@clerk/nextjs";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main>
		<div className="pb-5">
			<div className="p-10 flex flex-col bg-[#1E1819] text-white space-y-5">
				<h1 className="pt-5 max-w-3xl sm:max-w-2xl mx-auto text-5xl lg:text-5xl font-medium text-center">
					Securely collaborate on your content anywhere, anytime
				</h1>
				<p className="max-w-3xl mx-auto text-center">
					With Dropbox, you get a full suite of tools designed to help you create, share, manage, and track content more efficiently. Plus, proven cloud storage you can trust.
				</p>
				<Link href="/dashboard" className="flex cursor-pointer bg-blue-500 p-4 w-fit text-black justify-center items-center mx-auto">
					Try it for free 
					<ArrowRight className="ml-4"/>
				</Link>
			</div>

			<div className="bg-[#1E1819] h-full py-10 px-20">
				<video autoPlay loop muted className="rounded-lg pt-5">
					<source 
						src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/dropbox/dbx1-hero-1920x1080.mp4"
					/>
				</video>
			</div>
      	</div>

		<p className="text-center font-bold text-xl pt-5">Disclaimer</p>
		<p className="text-center font-light p-2 max-w-6xl mx-auto">This website is made for informational and educational purposes only. We do not own or affiliate with Dropbox or/and any of its subsidiaries in any form. Copyright Disclaimer under section 107 of the Copyright Act 1976, allowance is made for “fair use” of this video for education purposes.</p>
    </main>
  )
}
