export const authencatedGoToDashboard = async () => {
    const userStore = useUserStore()
    if (userStore.authorized) {
        useRouter().push('/dashboard')
    }
}