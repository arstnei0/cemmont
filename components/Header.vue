<template>
	<VAppBar :elevation="5" rounded>
		<VAppBarTitle>
			<NuxtLink to="/dashboard" class="nm">Dashboard</NuxtLink>
		</VAppBarTitle>
		<VSpacer></VSpacer>
		<div id="right-nav">
			<span>{{ user.username }}</span>
			<VMenu>
				<template v-slot:activator="{ props }">
					<VBtn v-bind="props" icon>
						<VAvatar size="32"
							><VImg
								:src="user.avatar || '/default.png'"
								alt="avatar"
							></VImg
						></VAvatar>
					</VBtn>
				</template>

				<VList v-if="userStore.authorized">
					<VListItem>
						<VListItemTitle><NuxtLink to="/logout">Logout</NuxtLink></VListItemTitle>
					</VListItem>
				</VList>
			</VMenu>
		</div>
	</VAppBar>
</template>

<script setup lang="ts">
const userStore = useUserStore()

const user = ref<any>({})
onMounted(async () => {
	watchEffect(async () => {
		user.value = await userStore.user || {}
	})
})
</script>

<style scoped>
#right-nav {
	margin-right: 1em;
}
</style>
