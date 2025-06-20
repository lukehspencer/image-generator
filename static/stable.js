// Image Generation using Hugging Face API and Stability AI model

// Function to query the Stability AI model via Hugging Face API
async function query(data) {
	//Use API call to access Stability AI model
	const response = await fetch(
		"https://router.huggingface.co/nscale/v1/images/generations",
		{
			headers: {
				Authorization: "Bearer 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",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

// Function to generate image based on user input
async function generateImage(prompt) {
	try {
		// Make sure to await the query and assign it to result
		const result = await query({
			prompt: prompt,
			model: "stabilityai/stable-diffusion-xl-base-1.0",
			response_format: "b64_json"
		});
		// Extract base64 image string
		const base64 = result.data[0].b64_json;
		const img = document.createElement("img");
		img.src = `data:image/png;base64,${base64}`;
		document.body.appendChild(img);

	} catch (error) {
		console.error("Failed to generate image:", error)
	}
}

// Takes in user prompt and generates an image on a non-local server
document.addEventListener("DOMContentLoaded", function() {
	let input = document.querySelector(".user-input")
	let submit = document.querySelector(".submit")
	
	submit.addEventListener("click", () => {
		if(input.value != "") {
			generateImage(input.value);
		}
	})
});
