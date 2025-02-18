import { createEvent, fetchEventById, deleteEventById, updateEventById } from "$lib/server/remote-events";
import type { Actions, PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({params}) => {
  if (!params.eventId) {
    return undefined;
  }
  const eventId = parseInt(params.eventId);
  const event = await fetchEventById(eventId);
  return {
    event
  }
}

export const actions: Actions = {
    post: async ({request}) => {
        const formdata = await request.formData();
        const title = formdata.get('title')?.toString();
        const description = formdata.get('description')?.toString();
        const date = formdata.get('date')?.toString();
        if (!title || !date) {
            error(400, 'Title and Date are required');
        }
        const newEvent = await createEvent({title, description, date});
        redirect(303, `/${newEvent.id}`);
    },
    delete: async ({request}) => {
      const formdata = await request.formData();
      const eventId = formdata.get('id');
      if (!eventId) {
        error(400, 'Event ID is required');
      }
      await deleteEventById(parseInt(eventId.toString()));
      redirect(303, '/');
    },
    update: async ({request}) => {
      const formdata = await request.formData();
      const eventId = formdata.get('id');
      const title = formdata.get('title')?.toString();
      const description = formdata.get('description')?.toString();
      const date = formdata.get('date')?.toString();
      if (!eventId || !title || !date) {
        error(400, 'Event ID, Title and Date are required');
      }
      const updatedEvent = await updateEventById(parseInt(eventId.toString()), {title, description, date});
      if (!updatedEvent) {
        error(404, 'Event not found');
      }
      redirect(303, `/${updatedEvent.id}`);
    }
}