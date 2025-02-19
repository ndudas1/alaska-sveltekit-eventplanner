<script lang="ts">
  import type { PageData } from './$types';

  let id = $state<number | undefined>(undefined);
  let title = $state<string>('');
  let description = $state<string | undefined>('');
  let date = $state<string>('');
  function validateDate() {
    const selectedDate = new Date(date);
    let today = new Date();
    if (selectedDate < today) {
      alert('Please select a date value that is not in the past');
      date = today.toString();
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

<form method="POST" class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white shadow-md rounded-lg">
  <input type="hidden" name="id" bind:value={id}>

 
  <div class="form-group flex flex-col">
    <label for="title" class="mb-2 font-semibold">Title</label>
    <input type="text" name="title" bind:value={title} class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
  </div>

  <div class="form-group flex flex-col">
    <label for="description" class="mb-2 font-semibold">Description</label>
    <textarea name="description" bind:value={description} class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
  </div>

  <div class="form-group flex flex-col">
    <label for="date" class="mb-2 font-semibold">Date</label>
    <input type="datetime-local" id="date" bind:value={date} oninput={validateDate} name="date" required class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
  </div>

  <div class="form-footer flex space-x-4 mt-4">
    {#if data.event}
      <button type="submit" formaction="?/update" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Update Event</button>
      <button type="submit" formaction="?/delete" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Delete Event</button>
    {:else}
      <button type="submit" formaction="?/post" class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Create Event</button>
    {/if}
  </div>

</form>