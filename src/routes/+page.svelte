<script lang="ts">
	import type { PageData } from "./$types";
  import Paper, { Title, Subtitle, Content } from '@smui/paper';
  import CircularProgress from '@smui/circular-progress';
  let {data}: {data: PageData} = $props();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<h2 class="text-xl">Events</h2>
{#await data.events}
    <div style="display: flex; justify-content: center">
      <CircularProgress style="height: 32px; width: 32px;" indeterminate />
    </div>
{:then events}

<div class="paper-container paper">
    {#each events as event}
      <Paper color="secondary">
        <Title>{event.id}: {event.title}</Title>
        <Subtitle>{event.description}</Subtitle>
        <Content>
          <p>{event.date}</p>
          <a class="btn" href="/newevent/{event.id}" role="button">Edit Event</a>
          <a class="btn" href="/{event.id}" role="button">View Event</a>
        </Content>
      </Paper>
    {/each}
  </div>

  <a class="btn" href="/newevent" role="button">Add Event</a>
{/await}

<style>
  .paper-container {
    display: grid;
    gap: 1rem;
  }
  .btn {
    margin-top: 1rem;
  }
</style>