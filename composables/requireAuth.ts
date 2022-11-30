export const requireAuth = async () => {
	const userStore = useUserStore()
	if (!userStore.authorized) {
		useRouter().push("/login")
	}
}
