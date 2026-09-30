const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Salt Lake Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-75001.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-3556.jpg"
    },
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-5139.jpg"
    }
];

const templeGrid = document.querySelector("#templeGrid");
const filterStatus = document.querySelector("#filterStatus");
const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");

function createTempleCard(temple) {
    const card = document.createElement("article");
    card.className = "temple-card";

    const image = document.createElement("img");
    image.src = temple.imageUrl;
    image.alt = temple.templeName;
    image.loading = "lazy";
    image.decoding = "async";

    const details = document.createElement("div");
    details.className = "temple-details";

    const name = document.createElement("h2");
    name.textContent = temple.templeName;
    details.append(name);

    const [year, month, day] = temple.dedicated.split(", ");
    const dedicationDate = new Date(`${month} ${day}, ${year} UTC`);
    const dedication = dedicationDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC"
    });

    [
        ["Location", temple.location],
        ["Dedicated", dedication],
        ["Area", `${temple.area.toLocaleString("en-US")} sq ft`]
    ].forEach(([label, value]) => {
        const detail = document.createElement("p");
        const heading = document.createElement("strong");
        heading.textContent = `${label}: `;
        detail.append(heading, document.createTextNode(value));
        details.append(detail);
    });

    card.append(image, details);
    return card;
}

function renderTemples(filter = "home") {
    const filteredTemples = temples.filter((temple) => {
        const dedicationYear = Number(temple.dedicated.split(",")[0]);

        if (filter === "old") return dedicationYear < 1900;
        if (filter === "new") return dedicationYear > 2000;
        if (filter === "large") return temple.area > 90000;
        if (filter === "small") return temple.area < 10000;
        return true;
    });

    templeGrid.replaceChildren(...filteredTemples.map(createTempleCard));
    const label = filter === "home" ? "all temples" : `${filter} temples`;
    filterStatus.textContent = `Showing ${filteredTemples.length} ${label}`;
}

navMenu.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-filter]");
    if (!link) return;

    event.preventDefault();
    renderTemples(link.dataset.filter);
    navMenu.querySelectorAll("a").forEach((navLink) => {
        navLink.removeAttribute("aria-current");
    });
    link.setAttribute("aria-current", "page");
    navMenu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.textContent = "☰";
});

menuButton.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuButton.textContent = isOpen ? "×" : "☰";
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;
renderTemples();
