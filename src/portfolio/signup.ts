const signUpForm = document.querySelector('.signup__form_fields')! as HTMLFormElement;
const signupHide = document.querySelector('.signup--hide-show')! as HTMLElement;
const imageInput = document.getElementById("photo")! as HTMLInputElement;

signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Accessing form data
    const formData = new FormData(signUpForm);

    // Retrieve Form data
    const name = formData.get('fullname');
    const photo = "Photo";
    const dob = "dob";
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch(`${apiUrl}api/auth/signup`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, email, photo, dob, password
                })
            });

        if (response.ok) {

            signupHide.style.display = 'none';

            messageConfirmation.firstElementChild!.innerHTML = `
                <i class="fa-solid fa-check"></i>
                <span>Registration was successful ! <br> Login to continue.</span>`;
            messageConfirmation.style.display = "block";

            loginForm.style.display = 'block';
        }
        else if (response.status == 400) {
            messageConfirmation.firstElementChild!.innerHTML = `
                <i class="fa-solid fa-xmark"></i>
                <span>User already exists!, Try again!</span>`;
            messageConfirmation.style.display = "block";
        } else {
            messageConfirmation.firstElementChild!.innerHTML = `
                <i class="fa-solid fa-xmark"></i>
                <span>Registration failed!, Try again!</span>`;
            messageConfirmation.style.display = "block";
        }
        setTimeout(() => {
            messageConfirmation.style.display = "none";
        }, 3000);
    } catch (error) {

    }
})