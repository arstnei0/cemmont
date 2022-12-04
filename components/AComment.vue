<template>
	<div class="comment">
		<div class="comment-info">
			<div class="comment-info-left">
                <img width="40" height="40" :src="(props.comment.sender.image as string)">
                <span class="comment-sender">{{ props.comment.sender?.name }}</span>
            </div>
			<span class="comment-date">{{
				new Date(props.comment.timeCreated).toLocaleString()
			}}</span>
		</div>
		<div class="comment-content">
			{{ props.comment.content }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { Comment, User } from "~~/prisma/client"

const props = defineProps<{
	comment: Comment & {
		sender: User
	}
}>()
</script>

<style>
.comment {
}

.comment-info {
	display: flex;
	align-items: center;
    justify-content: space-between;
}

.comment-info > * {
	padding: 0.3em;
}

.comment-info-left {
    display: flex;
	align-items: center;
}

.comment-info-left > * {
    padding: 0.3em;
}

.comment-content {
    margin-left: 3em;
}

.comment-sender {
    font-weight: 600;
    font-size: 1.5em;
}

.comment-date {
    font-size: 0.8em;
}
</style>
