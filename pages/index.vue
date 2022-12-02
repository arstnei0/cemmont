<template>
    <div>
        <h1>aaa</h1>
    </div>
</template>

<script setup lang="ts">
const { status, data, signIn, signOut } = await useSession({
    // Whether a session is required. If it is, a redirect to the signin page will happen if no active session exists
    required: true
})
</script>