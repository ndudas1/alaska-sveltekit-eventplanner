<script lang="ts">
  import type { PageData } from './$types';
  import Textfield  from '@smui/textfield';
  import { Textarea } from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';

  let id = $state<number | undefined>(undefined);
  let title = $state<string>('');
  let description = $state<string | undefined>('');
  let date = $state<string>('');
  function validateDate() {
    let today: string = new Date().toLocaleDateString();
    if (date < today) {
      alert('Please select a date value that is not in the past');
      date = today;
    }
  }
  let {data}: {data: PageData} = $props();
  if (data.event) {
    id = data.event.id;
    title = data.event.title;
    description = data.event.description;
    date = data.event.date;
  }
</script>

<style>
  .form-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
  .form-container label {
    align-self: center;
  }
  .form-container .form-group {
    display: contents;
  }
</style>

<form method="POST" class="form-container">
  <input type="hidden" name="id" bind:value={id}>

  <div class="form-group">
    <label for="title">Title</label>
    <Textfield variant="outlined" bind:value={title} label="Title" />
  </div>

  <div class="form-group">
    <label for="description">Description</label>
    <Textarea bind:value={description} />
  </div>

  <div class="form-group">
    <label for="date">Date</label>
    <input type="datetime-local" id="date" bind:value={date} oninput={validateDate} name="date" required>
  </div>

  {#if data.event}
    <button type="submit" formaction="?/update">Update Event</button>
    <button type="submit" formaction="?/delete">Delete Event</button>
  {:else}
    <button type="submit" formaction="?/post">Create Event</button>
  {/if}
</form>