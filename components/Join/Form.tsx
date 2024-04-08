"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp"
import { useToast } from "@/components/ui/use-toast"
import { setUser, setApiKeys } from "@/lib/storage"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

export default function JoinForm() {
	const [step, setStep] = useState(1)
	const [email, setEmail] = useState('')
	const [otp, setOtp] = useState('')
	const [loading, setLoading] = useState(false)

	const  { toast } = useToast()

	const sendOTP = async () => {
		setLoading(true);
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/user/send-otp`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email_id: email,
				}),
			});
			console.log("Response Status: ", response.status)
			console.log("Response OK: ", response.ok)
			if (response.ok) {
				toast({
					title: "OTP sent to your email",
					description: "Please enter the OTP sent to your email",
				});
				setStep(2);
			} else {
				toast({
					title: "Error",
					description: "Failed to send OTP",
				});
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to send OTP",
			});
		}
		setLoading(false);
	};

	const verifyOTP = async () => {
		setLoading(true);
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/user/verify-otp`, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email_id: email,
					otp: otp,
				}),
			});

			if (response.ok) {
				const responseData = await response.json();
				const user = responseData.user;
				const apikey = responseData.apikey;
				setUser(user);
				setApiKeys(apikey);
				window.location.href = '/dashboard';
			} else {
				toast({
					title: "Error",
					description: "Failed to verify OTP",
				});
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to verify OTP",
			});
		}
		setLoading(false);
	};
	
	return (
		<DialogContent className="mx-auto max-w-sm">
			<DialogHeader>
				<DialogTitle className="text-2xl">{step === 1 ? "Login" : "Enter OTP"}</DialogTitle>
				<DialogDescription>
					{step === 1 ? "Enter your email below to login to your account" : "Enter the OTP sent to your email"}
				</DialogDescription>
			</DialogHeader>
			<div>
				{step === 1 ? (
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<Button type="button" className="w-full" onClick={sendOTP} disabled={loading}>
							{loading ? "Sending..." : "Send OTP"}
						</Button>
					</div>
				) : (
					<div className="grid gap-4 justify-items-center">
						<InputOTP maxLength={6} value={otp} onChange={e => setOtp(e)} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
							</InputOTPGroup>
							<InputOTPSeparator />
							<InputOTPGroup>
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>
						</InputOTP>
						<Button type="button" className="w-full mt-4" onClick={verifyOTP} disabled={loading}>
							{loading ? "Verifying..." : "Verify OTP"}
						</Button>
					</div>
				)}
			</div>
		</DialogContent>
	)
}

