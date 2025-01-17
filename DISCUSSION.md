## I hope you like it!

I've spend a couple hours on it and I am turning this in for now... it was fun!

I decided not to use a database and just go with the mock data.

That being said, I wrote a note in the routes file where I think it would be necessary to add a database for functional reasons. Namely, querying specific advocates rather than returning the entire list. Writing that query would be fairly simple. I decided to spend most of my time on configuring the app to function as if that query were to be eventually written. Therefore, I added a searchTerm property to the fetch function as well as a pageNumer property.

I also rewrote the search function on the front end to call the fetch function instead of just work with data that has already been received. Therefore, I added a throttleDebounce function so as not to overwhelm the API.

I refactored the advocates and filteredAdvocates variables on the front-end so that the advocates variable (state variable) is the only one that is needed.

I improved the UI by adding tailwind classes as well as a pagination section.

There were other small changes I made, like making sure the searchTerm was a state variable rather than referenceing the DOM through document.getElement...

Overall, I did a lot of refactoring and adding new code, but I think I kept the vision in tact as far as what is trying to be accomplished.

Some considerations for further improvements include: mobile responsiveness (potentially using grid cards instead of table rows), database querying, further design and style considerations, etc.