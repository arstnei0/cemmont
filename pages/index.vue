<template>
    <div>
        <h1>aaa</h1>
        <Button>aaa</Button>
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
const { status, data, signIn, signOut } = await useSession({
    // Whether a session is required. If it is, a redirect to the signin page will happen if no active session exists
    required: false
})

</script>