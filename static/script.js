$addCupcakeForm = $("#add-cupcake");

function generateCupcakeListHTML(cupcake) {
    return `<div class="cupcake" data-id=${cupcake.id}>
        <img src="${cupcake.image}" alt="cupcake image">
        <li>${cupcake.flavor} - ${cupcake.size} / rating: ${cupcake.rating}</li>
        <button class="remove btn btn-danger">Delete</button
    </div>`;
}

async function createCupcakesList() {
    const res = await axios.get("/api/cupcakes");
    const cupcakes = res.data.cupcakes;
    for (cupcake of cupcakes) {
        appendCupcake(cupcake);
    }
}

function appendCupcake(cupcake) {
    $(".cupcake-list").append(generateCupcakeListHTML(cupcake));
}

async function addCupcake(flavor, size, rating, image) {
    const res = await axios({
        url: "/api/cupcakes",
        method: "POST",
        data: { flavor, size, rating, image },
    });

    const cupcake = res.data.cupcake;
    return cupcake;
}

async function createCupcake(evt) {
    evt.preventDefault();
    const flavor = $("#flavor").val();
    const size = $("#size").val();
    const rating = $("#rating").val();
    const image = $("#image").val();
    const cupcake = await addCupcake(flavor, size, rating, image);
    appendCupcake(cupcake);
    $addCupcakeForm.trigger("reset");
}

$addCupcakeForm.on("submit", createCupcake);

async function deleteCupcake(cupcakeId) {
    const res = await axios({
        url: `/api/cupcakes/${cupcakeId}`,
        method: "DELETE",
    });

    return res.data.message;
}

async function removeCupcake(evt) {
    evt.preventDefault();
    const cupcakeId = $(evt.target).parent().data("id");
    const message = await deleteCupcake(cupcakeId);
    if (message == "deleted") {
        $(evt.target).parent().remove();
    }
}

$(".cupcake-list").on("click", ".remove", removeCupcake);

createCupcakesList();
