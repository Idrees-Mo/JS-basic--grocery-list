const form = document.getElementById('main-form');
const input = document.querySelector('input');
const ul = document.getElementById('main-ul');
const mainDiv = document.getElementById('main');
const div = document.createElement('div');
div.id = 'toggel';
const label = document.createElement('label');
label.textContent = "Hide who haven't responded";
const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
label.appendChild(checkbox);
div.appendChild(label);
mainDiv.insertBefore(div, ul);

function createLi(invitee) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = invitee;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    // const label = document.createElement('label');
    // label.textContent = 'Confirmed';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(removeButton);

    li.appendChild(checkbox);
    return li;

};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invitee = input.value;
    input.value = '';
    const li = createLi(invitee);
    ul.appendChild(li);
});

ul.addEventListener('click', (e) => {
    const x = e.target;
    if (x.tagName === 'BUTTON') {
        const li = x.parentNode;
        const ul = li.parentNode;
        const nameAction = x.textContent;
        const action = {
            Remove: () => {
                ul.removeChild(li);
            },
            Edit: () => {
                const span = li.firstElementChild;
                const input = document.createElement('input');
                input.type = 'text';
                input.value = span.textContent
                li.insertBefore(input, span);
                li.removeChild(span);
                x.textContent = 'Save';
            },
            Save: () => {
                const input = li.firstElementChild;
                const span = document.createElement('span');
                span.textContent = input.value;
                li.insertBefore(span, input);
                li.removeChild(input);
                x.textContent = 'Edit';
            },
        };
        action[nameAction]();
    }
});

ul.addEventListener('change', (e) => {
    const x = e.target;
    const isChecked = x.checked;
    if (isChecked) {
        li = x.parentNode;
        li.className = 'responded';
    } else {
        li.className = '';
    }
});

label.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const list = ul.children;
    if (isChecked) {
        for (let i = 0; i < list.length; i += 1) {
            li = list[i];
            if (li.className === 'responded') {
                li.style.display = '';
            } else {
                li.style.display = 'none';
            }
        }
    } else {
        for (let i = 0; i < list.length; i += 1) {
            li = list[i];
            li.style.display = '';
        }
    }
});