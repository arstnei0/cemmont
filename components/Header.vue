<template>
    <VSpacer></VSpacer>
    <VAppBArTitle>{{user?.username}}</VAppBArTitle>
</template>

<script setup lang="ts">
const userStore = useUserStore()

const user = ref<any>({})
onMounted(async () => {
    console.log(await userStore.getUser())
    user.value = await userStore.getUser()
})
</script>

<style scoped>

</style>