
import { Injectable } from '@angular/core';

/**
 * Class for managing stylesheets. Stylesheets are loaded into named slots so that they can be
 * removed or changed later.
 */
@Injectable({
    providedIn: 'root'
})
export class PipStyleManager {
    /**
     * Set the stylesheet link with the specified key.
     */
    setLink(key: string, href: string) {
        getLinkElementForKey(key).setAttribute('href', href);
    }

    /**
     * Remove the stylesheet link with the specified key.
     */
    removeLink(key: string) {
        const existingLinkElement = getExistingLinkElementByKey(key);
        if (existingLinkElement) {
            document.head.removeChild(existingLinkElement);
        }
    }

    /**
     * Set the stylesheet content with the specified key.
     */
    setStyle(key: string, content: string) {
        getStyleElementForKey(key).innerHTML = content;
    }

    /**
    * Remove the stylesheet with the specified key.
    */
    removeStyle(key: string) {
        const existingStyleElement = getExistingStyleElementByKey(key);
        if (existingStyleElement) {
            document.head.removeChild(existingStyleElement);
        }
    }
}

function getLinkElementForKey(key: string) {
    return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
    return document.head.querySelector(`link[rel="stylesheet"].${getClassNameForKey(key)}`);
}

function getStyleElementForKey(key: string) {
    return getExistingStyleElementByKey(key) || createStyleElementWithKey(key);
}

function getExistingStyleElementByKey(key: string) {
    return document.head.querySelector(`style.${getClassNameForKey(key)}`);
}

function createLinkElementWithKey(key: string) {
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(getClassNameForKey(key));
    document.head.appendChild(linkEl);
    return linkEl;
}

function createStyleElementWithKey(key: string) {
    const linkEl = document.createElement('style');
    linkEl.classList.add(getClassNameForKey(key));
    document.head.appendChild(linkEl);
    return linkEl;
}

function getClassNameForKey(key: string) {
    return `style-manager-${key}`;
}
