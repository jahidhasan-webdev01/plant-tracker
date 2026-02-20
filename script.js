document.getElementById("filter-section")
    .addEventListener("click", function (event) {
        const clickedId = event.target.id;
        const currentFilter = document.getElementById("current-filter");

        // sections 
        const allPost = document.getElementById("all-posts");
        const thrivingPosts = document.getElementById("thriving-posts");
        const stragglingPosts = document.getElementById("straggling-posts");

        if (clickedId == "btn-all-filter") {
            removeAllFilterButtonDesign();
            currentFilter.innerText = "All";
            addFilterButtonDesign("btn-all-filter");

            thrivingPosts.classList.add("hidden");
            stragglingPosts.classList.add("hidden");
            allPost.classList.remove("hidden");
        }
        else if (clickedId == "btn-thriving-filter") {
            removeAllFilterButtonDesign();
            currentFilter.innerText = "Thriving";
            addFilterButtonDesign("btn-thriving-filter");

            stragglingPosts.classList.add("hidden");
            allPost.classList.add("hidden");
            thrivingPosts.classList.remove("hidden");

            render(thrivingPosts, thrivingPlants);

        } else if (clickedId == "btn-straggling-filter") {
            removeAllFilterButtonDesign();
            currentFilter.innerText = "Straggling";
            addFilterButtonDesign("btn-straggling-filter");

            thrivingPosts.classList.add("hidden");
            allPost.classList.add("hidden");
            stragglingPosts.classList.remove("hidden");

            render(stragglingPosts, stragglingPlants);
        }
    })

function removeAllFilterButtonDesign() {
    const allBtn = document.querySelectorAll(".btn-filter")
    for (const btn of allBtn) {
        btn.classList.remove("bg-black", "text-white");
    }
}

function addFilterButtonDesign(_id) {
    const btn = document.querySelector(`#${_id}`)
    btn.classList.add("bg-black", "text-white");
}

const thrivingPlants = [];
const stragglingPlants = [];

// Event Delegation
document.querySelector(".posts").addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-make-thriving")) {
        handleThriving(event);
    }

    if (event.target.classList.contains("btn-make-straggling")) {
        handleStraggling(event);
    }
})

function handleThriving(e) {
    const plantInfo = e.target.parentNode.parentNode;
    const plantName = plantInfo.querySelector("h1").innerText;

    const isAlreadyThriving = !!thrivingPlants.find(plant => plant.name === plantName);

    if (!isAlreadyThriving) {
        const type = plantInfo.querySelector("#type").innerText;
        const status = plantInfo.querySelector("#status");
        status.innerText = "thriving";
        status.classList.remove("bg-black", "bg-red-400");
        status.classList.add("bg-green-600");

        const plantationDate = plantInfo.querySelector("#plantation-date").innerText;
        const imageURL = plantInfo.querySelector("img").getAttribute("src");

        disableStraggling(e)

        const data = {
            name: plantName,
            type,
            status,
            plantationDate,
            imageURL,
        }

        thrivingPlants.push(data);

    } else {
        const status = plantInfo.querySelector("#status");
        status.innerText = "thriving";
        status.classList.remove("bg-black", "bg-red-400");
        status.classList.add("bg-green-600");

        disableStraggling(e);
        const plantExist = thrivingPlants.find(plant => plant.name === plantName);

        if (plantExist) {
            plantExist.status = "thriving";
        }
    }

    count();
}

function handleStraggling(e) {
    const plantInfo = e.target.parentNode.parentNode;
    const plantName = plantInfo.querySelector("h1").innerText;

    const isAlreadyStraggling = !!stragglingPlants.find(plant => plant.name === plantName);

    if (!isAlreadyStraggling) {
        const type = plantInfo.querySelector("#type").innerText;
        const status = plantInfo.querySelector("#status");
        status.innerText = "straggling";
        status.classList.remove("bg-black", "bg-green-600");
        status.classList.add("bg-red-400");

        const plantationDate = plantInfo.querySelector("#plantation-date").innerText;
        const imageURL = plantInfo.querySelector("img").getAttribute("src");

        disableThriving(e);

        const data = {
            name: plantName,
            type,
            status,
            plantationDate,
            imageURL,
        }

        stragglingPlants.push(data);
    } else {
        const status = plantInfo.querySelector("#status");
        status.innerText = "straggling";
        status.classList.remove("bg-black", "bg-green-600");
        status.classList.add("bg-red-400");

        disableThriving(e);

        const plantExist = stragglingPlants.find(plant => plant.name === plantName);

        if (plantExist) {
            plantExist.status = "straggling";
        }
    }

    count();
}

function disableStraggling(e) {
    const parent = e.target.parentNode;

    parent.querySelector(".btn-make-thriving").classList.remove("cursor-pointer");
    parent.querySelector(".btn-make-thriving").classList.add("cursor-not-allowed");

    parent.querySelector(".btn-make-straggling").classList.remove("cursor-not-allowed");
    parent.querySelector(".btn-make-straggling").classList.add("cursor-pointer");
}

function disableThriving(e) {
    const parent = e.target.parentNode;

    parent.querySelector(".btn-make-straggling").classList.remove("cursor-pointer");
    parent.querySelector(".btn-make-straggling").classList.add("cursor-not-allowed");

    parent.querySelector(".btn-make-thriving").classList.remove("cursor-not-allowed");
    parent.querySelector(".btn-make-thriving").classList.add("cursor-pointer");
}

function render(sectionEl, data) {
    sectionEl.innerHTML = '';

    data.forEach(plant => {
        console.log(plant)
        const newPost = document.createElement("div");

        newPost.innerHTML = `
        <div class="bg-white p-8 rounded-lg shadow-2xl">
                <img src="./assests/maple-leaf.webp" alt="maple-leaf" class="rounded-lg w-full h-60 object-cover">

                <div class="mt-4 space-y-2">
                    <h1 class="text-xl font-bold">${plant.name}</h1>

                    <p>Type:
                        <span id="type" class="bg-amber-400 text-white px-3 py-0.5 rounded-full text-sm">
                            ${plant.type}
                        </span>
                    </p>

                    <p>Status:
                        <span id="status"
                            class="lowercase bg-black px-3 py-0.5 font-bold text-white rounded-full text-sm">
                            ${plant.status}
                        </span>
                    </p>

                    <p class="text-neutral-500">
                        Plantation Date: <span id="plantation-date">${plant.plantationDate}</span>
                    </p>
                </div>
            </div>
        `

        sectionEl.appendChild(newPost);

    })


}

function count() {
    const totalCount = document.getElementById("all-posts").children.length;

    document.getElementById("total-count").innerText = totalCount;
    document.getElementById("thriving-count").innerText = thrivingPlants.length;
    document.getElementById("straggling-count").innerText = stragglingPlants.length;
}

count();
