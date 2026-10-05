const products = [
	{
		id: "fc-1888",
		name: "flux capacitor",
		averagerating: 4.5
	},
	{
		id: "fc-2050",
		name: "power laces",
		averagerating: 4.7
	},
	{
		id: "fs-1987",
		name: "time circuits",
		averagerating: 3.5
	},
	{
		id: "ac-2000",
		name: "low voltage reactor",
		averagerating: 3.9
	},
	{
		id: "jj-1969",
		name: "warp equalizer",
		averagerating: 5.0
	}
];

const productSelect = document.querySelector("#product");

if (productSelect) {
	products.forEach((product) => {
		const option = document.createElement("option");
		option.value = product.id;
		option.textContent = product.name;
		productSelect.append(option);
	});
}

const reviewCount = document.querySelector("#review-count");

if (reviewCount) {
	const submittedData = new URLSearchParams(window.location.search);
	const productId = submittedData.get("product");
	const rating = submittedData.get("rating");
	const installDate = submittedData.get("install-date");
	const submittedProduct = products.find((product) => product.id === productId);

	if (submittedProduct && rating && installDate) {
		const count = Number(localStorage.getItem("reviewCount") || 0) + 1;
		localStorage.setItem("reviewCount", count);
		reviewCount.textContent = count;

		document.querySelector("#review-product").textContent = submittedProduct.name;
		document.querySelector("#review-rating").textContent = `${rating} out of 5 stars`;
		document.querySelector("#review-install-date").textContent = installDate;
		document.querySelector("#review-features").textContent = submittedData.getAll("features").join(", ") || "None selected";
		document.querySelector("#review-text").textContent = submittedData.get("review") || "No written review provided.";
		document.querySelector("#review-name").textContent = submittedData.get("user-name") || "Not provided";
	} else {
		document.querySelector(".confirmation h2").textContent = "Review not found";
		document.querySelector("#confirmation-message").textContent = "No completed review was found. Please submit the form to record your review.";
		document.querySelector("#review-summary").hidden = true;
		reviewCount.textContent = localStorage.getItem("reviewCount") || "0";
	}
}
