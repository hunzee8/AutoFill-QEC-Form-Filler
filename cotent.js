// Wait for the page to load completely
document.addEventListener("DOMContentLoaded", function () {
    // Select the dropdown and iterate through subjects
    const dropdown = document.querySelector("select"); // Adjust the selector as needed
    if (!dropdown) return alert("Subject dropdown not found!");

    const options = dropdown.options;

    const fillAndSubmit = async () => {
        for (let i = 1; i < options.length; i++) {
            dropdown.selectedIndex = i;
            dropdown.dispatchEvent(new Event("change")); // Trigger the change event

            // Wait for questions to load (adjust the timeout as needed)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Select "B" for all questions
            const radioButtons = document.querySelectorAll("input[type='radio'][value='B']");
            radioButtons.forEach(rb => {
                if (rb.offsetParent !== null) rb.click(); // Ensure it's visible
            });

            // Click the "Submit Performa" button
            const submitButton = document.querySelector("button"); // Adjust selector if needed
            if (submitButton) {
                submitButton.click();
                await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for submission
            }
        }
        alert("All subjects graded with 'B' and submitted!");
    };

    fillAndSubmit();
});
