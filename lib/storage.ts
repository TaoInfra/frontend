"use client"
import { UserData, ApiKeyData } from "@/types"

/* eslint-disable @typescript-eslint/ban-ts-comment */
function getUser(): UserData | null {
	try {
		const user = localStorage.getItem('user')
		if (!user) {
			return null
		}
		try {
			//@ts-ignore
			return JSON.parse(user)
		} catch (error) {
			return null
		}
	} catch (error) {
		return null
	}
}

function setUser(user: UserData) {
	localStorage.setItem('user', JSON.stringify(user))
}

function setApiKeys(apiKeys: ApiKeyData[]) {
	localStorage.setItem('apiKeys', JSON.stringify(apiKeys))
}

function getApiKeys(scope: string | null = null): ApiKeyData[] | []  {
	const apiKeys = localStorage.getItem('apiKeys')
	if (!apiKeys) {
		return []
	}
	try {
		//@ts-ignore
		let keys = JSON.parse(apiKeys)
		if (scope) {
			keys = keys.filter((key: ApiKeyData) => key.scope.includes(scope))
		}
		if (keys.length === 0) {
			return []
		}
		return keys
	} catch (error) {
		return []
	}
}

export {
	getUser,
	setUser,
	getApiKeys,
	setApiKeys
}

