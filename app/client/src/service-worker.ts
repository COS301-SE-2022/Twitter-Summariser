/// <reference lib="webworker" />

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import { openDB } from "idb"; 
import { SHA256 } from "crypto-js";

declare const self: ServiceWorkerGlobalScope;

const tableName: string = "post-cache";

const dbCache = openDB('Cache-Requests', 1, {
	upgrade(db) {
		db.createObjectStore(tableName);
	}
});

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
	// Return false to exempt requests from being fulfilled by index.html.
	({ request, url }: { request: Request; url: URL }) => {
		// If this isn't a navigation, skip.
		if (request.mode !== "navigate") {
			return false;
		}

		// If this is a URL that starts with /_, skip.
		if (url.pathname.startsWith("/_")) {
			return false;
		}

		// If this looks like a URL for a resource, because it contains
		// a file extension, skip.
		if (url.pathname.match(fileExtensionRegexp)) {
			return false;
		}

		// Return true to signal that we want to use the handler.
		return true;
	},
	createHandlerBoundToURL(`${process.env.PUBLIC_URL}/index.html`)
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
	// Add in any other file extensions or routing criteria as needed.
	({ url }) => url.origin === self.location.origin && url.pathname.endsWith(".png"),
	// Customize this strategy as needed, e.g., by changing to CacheFirst.
	new StaleWhileRevalidate({
		cacheName: "images",
		plugins: [
			// Ensure that once this runtime cache reaches a maximum size the
			// least-recently used images are removed.
			new ExpirationPlugin({ maxEntries: 50 })
		]
	})
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
	if (event.data && event.data.type === "SKIP_WAITING") {
		self.skipWaiting();
	}
});

// Any other custom service worker logic can go here.

self.addEventListener("fetch", async (event)=> {
	
	let url = event.request.url;
	
	if (event.request.method === "POST" && url.includes("/dev/get")) {
		event.respondWith(networkFirst(event));
	}
});

const networkFirst =async (event: any) => {
	return fetch(event.request.clone())
					.then((response: any) => {
						putValue(event.request.clone(), response.clone());
						return response;
					})
					.catch(() => {
						return getValue(event.request.clone());
					})

}

const serialisedReponse =async (response: any) => {
	let serialisedHeaders: any = {};

	for (let entry of response.headers.entries()) {
		serialisedHeaders[entry[0]] = entry[1];
	}

	let serialised = {
		headers: serialisedHeaders,
		status: response.status,
		statusText: response.statusText,
		body: "body"
	}

	serialised.body = await response.json();

	return serialised;
}

let getValue = async (request: any) => {
	let cacheData;

	try {
		let url = await request.url;

		const id = SHA256(url.toString()).toString();
		
		const tx = (await dbCache).transaction(tableName, "readonly");
		const store = tx.objectStore(tableName);
		cacheData = await store.get(id);

		if (!cacheData) return null;

		let maxAge = 3600;

		if (Date.now() - cacheData.timestamp > maxAge * 1000)
			return null;

		return new Response(JSON.stringify(cacheData.response.body), cacheData.response);
	} catch (err) {
		console.log(err);
		return null;
	};
}

let putValue = async (request: any, response: any) => {
	let url = await request.url;
	
	const id = SHA256(url.toString()).toString();

	let entry = {
		response: await serialisedReponse(response),
		timestamp: Date.now()
	}

	const tx = (await dbCache).transaction(tableName, "readwrite");
	const store = tx.objectStore(tableName);
	store.put(entry, id);
}
