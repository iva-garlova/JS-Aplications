import { getEventById } from "../data/events.js";
import { getVisitorsById, gotoEvent, isGoing } from "../data/going.js";
import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (data, hasUser, isOwner,visitors, isUserGoing, onDelete, onGoing) => html`
 <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${data.imageUrl} alt="example1" />
            <p id="details-title">${data.name}</p>
            <p id="details-category">
              Category: <span id="categories">${data.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${data.date}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <span>${data.description}</span>
              </div>

            </div>

            <h3>Going: <span id="go">${visitors}</span> times.</h3>

            <!--Edit and Delete are only for creator-->
            ${ hasUser ? html`
            <div id="action-buttons">
                ${ isOwner ? html`
              <a href="/edit/${data._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>` :
               (
                isUserGoing ? null : html`<a href="javascript:void(0)" id="go-btn" @click=${onGoing}>Going</a>`) }
            </div>` : null }
          </div>
</section>`;

export async function showdetails(ctx){
    const id = ctx.params.id;

    const requests =[
        getEventById(id),
        getVisitorsById(id)
    ];
    const user = getUserData();

    if(user){
        requests.push(isGoing(id, user._id))
    }

    const [event, visitors, isUserGoing] = await Promise.all(requests);

    const hasUser = !!user;
    const isOwner = hasUser && user._id == event._ownerId;
    render(detailsTemplate(event, hasUser, isOwner,visitors, isUserGoing, onDelete, onGoing));

    async function onDelete(){
        const choise = confirm('Are you sure');

        if(choise){
            await deleteEvent(id);
            page.redirect('/catalog')
        }
    }

    async function onGoing() {
await gotoEvent(id);
page.redirect('/catalog/' + id);
    }
}