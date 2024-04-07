"use client"

/* eslint-disable @typescript-eslint/ban-ts-comment */
function getUser() {
	const user = localStorage.getItem('user')
	if (!user) {}
	try {
        //@ts-ignore
		return JSON.parse(user)
	} catch (error) {
		return {}
	}
}

function setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user))
}

export {
    getUser,
    setUser
}