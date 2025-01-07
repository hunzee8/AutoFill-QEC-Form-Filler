
// Made by Hunzla Arshad
// Contact Me:
//		hunzlaarshad82@gmail.com
//		231356@students.au.edu.pk
document.addEventListener("DOMContentLoaded", function () {

    const dropdown = document.querySelector("select"); 
    if (!dropdown) return alert("Subject dropdown not found!");

    const options = dropdown.options;

    const fillAndSubmit = async () => {
        for (let i = 1; i < options.length; i++) {
            dropdown.selectedIndex = i;
            dropdown.dispatchEvent(new Event("change")); 

            await new Promise(resolve => setTimeout(resolve, 2000));

            const radioButtons = document.querySelectorAll("input[type='radio'][value='B']");
            radioButtons.forEach(rb => {
                if (rb.offsetParent !== null) rb.click(); 
            });

            const submitButton = document.querySelector("button"); 
            if (submitButton) {
                submitButton.click();
                await new Promise(resolve => setTimeout(resolve, 3000)); 
            }
        }
        alert("All subjects graded with 'B' and submitted!");
    };

    fillAndSubmit();
});
