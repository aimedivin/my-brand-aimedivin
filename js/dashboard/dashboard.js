const statusBlogValue = document.querySelector('.content__status_blog_value');

const blogNumber = JSON.parse(window.localStorage.getItem('blogs'));
if (statusBlogValue) {
    statusBlogValue.innerText = blogNumber.length;
}


// Message Display

const contentDataTable = document.querySelector('.content__data_table');

const dashMessage = JSON.parse(localStorage.getItem('messages'))

const fargment = document.createDocumentFragment();


for (let i = 0; i < dashMessage.length; i++) {
    if (i == 5) break;

    const tableRow = document.createElement('tr')

    const col1 = document.createElement('td')
    col1.textContent = dashMessage[i].email;

    const col2 = document.createElement('td')
    col2.textContent = dashMessage[i].subject;

    const col3 = document.createElement('td')
    const colForm = document.createElement('form')
    const colFormBtn = document.createElement('button');

    colFormBtn.classList.add('content__data_btn');
    colFormBtn.textContent = 'Reply';

    colForm.appendChild(colFormBtn)
    col3.appendChild(colForm);

    console.log('in');

    tableRow.appendChild(col1);
    tableRow.appendChild(col2);
    tableRow.appendChild(col3);
    fargment.appendChild(tableRow);
}

contentDataTable.appendChild(fargment);



