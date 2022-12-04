<template>
	<Menubar :model="menuItems">
		<template #end>
			<div @click="toggleUserMenu" style="cursor: pointer;">
				<Avatar :image="session.data.value?.user?.image || '/default.webp'"></Avatar>
			</div>
			<TieredMenu ref="userMenu" :model="userMenuItems" :popup="true" />
		</template>
	</Menubar>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar'
import Avatar from 'primevue/avatar'
import TieredMenu from 'primevue/tieredmenu'

const session = await useSession({
	required: false
})

const menuItems = [
	{
		label: 'Dashboard',
		to: '/dashboard'
	}
]

const userMenuItems = [
	{
		label: 'logout',
		command: () => session.signOut()
	}
]

const userMenu = ref<any | null>(null)

const toggleUserMenu = (event: any) => {
	userMenu.value?.toggle(event)
}
</script>

<style scoped>
#right-nav {
	margin-right: 1em;
}
</style>
