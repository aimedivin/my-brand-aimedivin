const contentMain = document.querySelector(".content__main")!;

type storedBlog = {
    title: string,
    photo: string,
    description: string
}

const allBlogs = () => {
    const blogs: storedBlog[] = JSON.parse(window.localStorage.getItem('blogs')!);
    let container = '';
    if (blogs) {
        blogs.forEach((element, index: number) => {
            container += `<div class="content__blog">
                    <div class="content__blog_thumbnail">
                        <img src="${element.photo}" alt="">
                    </div>
                    <div class="content__blog_info">
                        <h1>${element.title}</h1>
                        <h2>${element.description.slice(0,170)} ...</h2>
                        <p></p>
                        <form action="" class="content__blog_cta_btn">
                            <input type="hidden" name="" value="${index}">
                            <a href="/dashboard/add-edit-blog.html" class="btn-edit">Edit</a>
                            <a href="/dashboard/add-edit-blog.html" class="btn-delete">Delete</a>
                        </form>
                    </div>
                </div>
                <hr>`
        });
    }
    if (container.length) {
        contentMain.innerHTML = container;
    } else {
        contentMain.innerHTML = "<p>No Blogs Found, Add New.<p>"
    }
}

window.addEventListener('load', allBlogs)


// ----------------------- Blog CRUD operation and Form Validation ---------------------------------------

const editBtn = document.getElementsByClassName('btn-edit')!;
const addBlogBtn = document.querySelector('.btn-new-blog')!;
const editAddForm = document.querySelector('.content__add_edit_form')! as HTMLFormElement;

const contentMainBlogs = document.querySelector('.content__main')!;

const errorMessage = document.getElementsByClassName('error-message')!;
    ;
const title = document.getElementById('title')! as HTMLInputElement;
const photo = document.getElementById('photo')! as HTMLInputElement;
const description = document.getElementById('description')! as HTMLTextAreaElement;

// array for input with invalid data
let errorFieldsForms: (HTMLElement)[] = [];

let photoDataUrl = '';

const contentAddEditTitle = document.querySelector('.content__add_edit_title')!;

const contentAddEdit: HTMLDivElement = document.querySelector('.content__add_edit')!;
const closeBtn = document.querySelector('.content__close_btn')!;

closeBtn.addEventListener('click', () => {
    contentAddEdit.style.display = 'none'
});


if (photo) {
    photo.addEventListener('change', function () {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            photoDataUrl = (reader.result as string);
        })
        if (this.files) {
            reader.readAsDataURL(this.files[0]);
        }


        if (localStorage.getItem('mode') != "edit" && photo.files) {
            if (!photo.files[0] || photo.files[0].type.slice(0, 5) != 'image') {
                errorFieldsForms.push(photo);
            }
        } 
    });
}


contentMainBlogs.addEventListener('click', (e: Event) => {

    e.preventDefault();

    let target = e.target! as HTMLElement;

    Array.from(errorMessage).forEach(element => {
        (element as HTMLElement).style.display ="none";
    });

    if (target.classList.value == 'btn-edit') {
        
        contentAddEdit.style.display = 'flex';
        localStorage.setItem('mode', 'edit');
        localStorage.setItem("updateIndex", (target.previousElementSibling as HTMLInputElement).value);
        contentAddEditTitle!.innerHTML = 'Edit Blog';

        // Prepopulating Data and Editing Blog

        (editAddForm.lastElementChild as HTMLElement).innerText = "Update Blog"
        let blogs = JSON.parse(localStorage.getItem('blogs')!);
        let blogIndex = JSON.parse(localStorage.getItem('updateIndex')!);
        console.log(blogIndex);
        (photo.previousElementSibling! as HTMLElement).innerText = 'Update Photo';
        editAddForm.reset();
        photoDataUrl = blogs[blogIndex].photo;
        description.value = blogs[blogIndex].description;
        title.value = blogs[blogIndex].title;
    }

    // Deleting a blog
    if (target.classList.value == 'btn-delete') {
        let blogIndex = (target.parentElement!.firstElementChild as HTMLInputElement).value;
        // console.log(blogIndex);
        let blogs = JSON.parse(localStorage.getItem('blogs')!);

        if (blogs[blogIndex]) {
            blogs.splice(Number(blogIndex), 1);
            localStorage.setItem("blogs", `${JSON.stringify(blogs)}`);
            allBlogs();
        }
    }
});


// Adding New Blog
addBlogBtn.addEventListener('click', (e) => {
    e.preventDefault();

    Array.from(errorMessage).forEach(el => {
        (el as HTMLElement).style.display = "none";
    });

    localStorage.setItem('mode', 'newblog');
    contentAddEdit.style.display = 'flex';
    contentAddEditTitle.innerHTML = 'Add new Blog';
    (editAddForm.lastElementChild as HTMLElement).innerText = "Post Blog";
    (photo.previousElementSibling as HTMLElement).innerText = 'Blog Photo'

    editAddForm.reset();
    photoDataUrl = '';
});

// Inputing, reset errorFieldsForms array
title.addEventListener('input', () => {
    errorFieldsForms = [];
    Array.from(errorMessage).forEach(el => {
        (el as HTMLElement).style.display = "none";
    });
});

photo.addEventListener('change', () => {
    errorFieldsForms = [];
    Array.from(errorMessage).forEach(el => {
        (el as HTMLElement).style.display = "none";
    });
});

description.addEventListener('input', () => {
    errorFieldsForms = [];
    
    Array.from(errorMessage).forEach(el => {
        (el as HTMLElement).style.display = "none";
    });
});

// Submit Event for the Add new blog form
editAddForm.addEventListener('submit', e => {

    // console.log(photo.files[0].name);
    let blogs = JSON.parse(localStorage.getItem('blogs')!);
    let blogIndex = JSON.parse(localStorage.getItem('updateIndex')!);
    e.preventDefault();

    // Form Validation
    // console.log(photo.files[0]);
    
    if (title.value.split(' ').join('').length < 4) {
        errorFieldsForms.push(title)
    }
    if (description.value.split(' ').join('').length < 100) {
        errorFieldsForms.push(description)
    }

    // Adding New 
    if (errorFieldsForms.length) {
        errorFieldsForms.forEach(el => {

            let childrenPreviousSibling = el.previousElementSibling! as HTMLElement
            let parentPreviousSibling = el.parentElement!.previousElementSibling as HTMLElement

            if (el.id == 'title') {
                parentPreviousSibling.innerText = "Enter valid title | *min = 4 characters";
                parentPreviousSibling.style.display = "block";
            }
            if (el.id == 'photo') {
                if (localStorage.getItem('mode') == "edit") {

                } else {
                    parentPreviousSibling.innerText = "Enter valid Image";
                    parentPreviousSibling.style.display = "block";
                }
                
            }
            if (el.id == 'description') {
                childrenPreviousSibling.innerText = "Enter valid description | *min = 100 characters";
                childrenPreviousSibling.style.display = "block";
            }
        })
    } else {
        if (localStorage.getItem('mode') == "newblog") {
            const newBlog = { title: title.value, photo: photoDataUrl, description: description.value };
            if (blogs.length) {
                blogs.push(newBlog);
                localStorage.setItem("blogs", `${JSON.stringify(blogs)}`);
            }
            else {
                localStorage.setItem("blogs", `[${JSON.stringify(newBlog)}]`);
            }
            contentAddEdit.style.display = 'none';
            allBlogs();
        }

        // Editing Existing Blog
        if (localStorage.getItem('mode') == "edit") {
            const newBlog = { title: title.value, photo: photoDataUrl, description: description.value };
            if (blogs) {
                blogs[blogIndex] = newBlog;
                localStorage.setItem("blogs", `${JSON.stringify(blogs)}`);
            }
            allBlogs();
            contentAddEdit.style.display = 'none'
        }
    }
});




