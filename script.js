document.getElementById("filter-section")
    .addEventListener("click", function (event) {
        const clickedId = event.target.id;
        const currentFilter = document.getElementById("current-filter");
        if (clickedId == "btn-all-filter") {
            removeAllFilterButtonDesign();
            currentFilter.innerText = "All";
            addFilterButtonDesign("btn-all-filter");
        }
        else if (clickedId == "btn-thriving-filter") {
            removeAllFilterButtonDesign();
            currentFilter.innerText = "Thriving";
            addFilterButtonDesign("btn-thriving-filter");

        } else if (clickedId == "btn-straggling-filter") {
            removeAllFilterButtonDesign();
            currentFilter.innerText = "Straggling";
            addFilterButtonDesign("btn-straggling-filter");
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
document.querySelector("#posts").addEventListener("click", function (event) {
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