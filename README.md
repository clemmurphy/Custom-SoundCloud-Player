# Custom SoundCloud Player

## What Is It?

A custom player to interact with SoundCloud's iframe elements, created for One House for their artist pages.

## The Build

The client brief was to build a player for their artist pages, playing a track and linking out to their SoundCloud page. I accomplished this by using SoundCloud's embeddable iframe elements and widget API to track events within that iframe, and created a custom front end using design elements from their existing brand.

The client's site is built in Webflow, so the build needed to be simple, with no server-side components, and simple in scope to enable embedding within the pages.

## The Challenges

Without an API key for the rich API, and SoundCloud's documentation having not been updated since 2012, my early versions were created with a 'test and learn' approach to figure out the best way to get the sounds to play as intended while also getting access to the artist and track information.

I accomplished this by querying two separate endpoints and combining the results into the single player function.

Webflow's scripts are also capped at 10,000 characters, so I had to keep the script extremely simple without any frameworks.

The project is currently live on One House's website artist pages.
