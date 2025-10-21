export default class Navbar {
    /**
     * 
     * @param {{title: string, href: string}[]} links 
     * @param {HTMLElement} parentElement 
     */
    constructor(links, parentElement) {
        this.links = links;
        this.parentEl = parentElement;
    }

    create() {
        /**
         * 
         * @param {string} tag 
         * @param {string} cls 
         * @param {string} text 
         * @param {string} href 
         * @param {boolean} isMobile 
         * @returns
         */
        const newEl = (tag, cls, text, href, isMobile) => {
            const el = document.createElement(tag);
            if (cls) el.className = cls;
            if (text) el.innerHTML = text;
            if (href) el.href = href;
            if (isMobile) el.setAttribute("x-on:click", "isOffcanvasOpen = !isOffcanvasOpen")
            return el;
        }

        this.parentEl.innerHTML = `<nav class="bg-gray-200 dark:bg-stone-900 text-gray-800 dark:text-gray-200 border-b border-b-gray-300 dark:border-b-stone-700" x-data="{ isOffcanvasOpen: false, }">
            <div class="max-w-7xl mx-4 md:mx-6 lg:mx-8 xl:mx-auto py-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
                <a class="text-xl sm:text-2xl font-semibold sm:col-span-2" href="#">HTML Live Editor</a>
                <ul class="hidden sm:inline-flex justify-end items-center gap-4 col-span-2 navbarLinks"></ul>
                <button type="button" x-on:click="toggleTheme()" class="hidden sm:block bg-transparent justify-self-end hover:bg-gray-300 dark:hover:bg-stone-700 active:bg-gray-400/50 dark:active:bg-stone-600/50 focus:outline focus:outline-offset-2 focus:outline-gray-400 dark:focus:outline-stone-600 rounded-lg w-10 h-8">
                    <i class="fa-solid fa-moon text-xl"></i>
                </button>
                <button type="button" x-on:click="isOffcanvasOpen = !isOffcanvasOpen" class="block sm:hidden bg-transparent justify-self-end hover:bg-gray-300 dark:hover:bg-stone-700 active:bg-gray-400/50 dark:active:bg-stone-600/50 focus:outline focus:outline-offset-2 focus:outline-gray-400 dark:focus:outline-stone-600 rounded-lg w-10 h-8">
                    <i class="fa-solid fa-bars text-xl"></i>
                </button>
            </div>
            <div class="fixed top-0 bottom-0 left-0 right-0 backdrop-blur-xs z-10" x-show="isOffcanvasOpen"
                x-transition:enter="transition ease-out duration-400"
                x-transition:enter-start="-translate-x-full"
                x-transition:enter-end="translate-x-0"
                x-transition:leave="transition ease-in duration-400"
                x-transition:leave-start="translate-x-0"
                x-transition:leave-end="-translate-x-full"
            >
                <div class="max-w-sm h-full p-4 flex flex-col gap-4 bg-gray-200 dark:bg-stone-800 border-e border-e-gray-300 dark:border-e-stone-700">
                    <div class="grid grid-cols-3">
                        <a class="text-xl sm:text-2xl font-semibold col-span-2" href="#">HTML Live Editor</a>
                        <button type="button" x-on:click="isOffcanvasOpen = !isOffcanvasOpen" class="bg-transparent justify-self-end hover:bg-gray-300 dark:hover:bg-stone-700 active:bg-gray-400/50 dark:active:bg-stone-600/50 focus:outline focus:outline-offset-2 focus:outline-gray-400 dark:focus:outline-stone-600 rounded-lg w-10 h-8">
                            <i class="fa-solid fa-xmark text-xl"></i>
                        </button>
                    </div>
                    <div class="flex flex-col gap-4">
                        <ul class="flex flex-col gap-4 navbarLinksMobile"></ul>
                        <button type="button" x-on:click="isOffcanvasOpen = !isOffcanvasOpen; toggleTheme()" class="bg-gray-300 dark:bg-stone-700 hover:bg-gray-400 dark:hover:bg-stone-600 active:bg-gray-500/50 dark:active:bg-stone-500/50 focus:outline focus:outline-offset-2 focus:outline-gray-500 dark:focus:outline-stone-500 rounded-lg w-full h-8">
                            <i class="fa-solid fa-moon text-xl"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>`;

        const linksContainer = this.parentEl.querySelector(".navbarLinks");
        const linksContainerMobile = this.parentEl.querySelector(".navbarLinksMobile");
        for (const link of this.links) {
            const li = newEl("li");
            const a = newEl("a", "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 active:text-green-700/50 dark:active:text-green-500/50 focus:underline focus:underline-offset-4", link.title, link.href);
            li.appendChild(a);
            linksContainer.appendChild(li);

            const liMobile = newEl("li");
            const aMobile = newEl("a", "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 active:text-green-700/50 dark:active:text-green-500/50 focus:underline focus:underline-offset-4", link.title, link.href, true);
            liMobile.appendChild(aMobile);
            linksContainerMobile.appendChild(liMobile);
        }
    }
}