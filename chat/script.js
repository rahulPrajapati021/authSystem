
console.log("connected")


function Post(content) {
    this.content = content;
}

// display constructor goes here 
function Display() {
    
}
// display constructor prototypes goes here/
Display.prototype.add = function(post) {
    let postArea = document.getElementById("postArea");
    let uiString = `<div class="posts">
    <p>${post.content}</p>
    </div>
    `;
    postArea.innerHTML += uiString;
    postArea.scrollTop = postArea.scrollHeight;
}

Display.prototype.clear = function() {
let postForm = document.getElementById("postForm");
    postForm.reset();
}


// grab the form and make post out of it the work goes here 

let postForm = document.getElementById("postForm");

postForm.addEventListener("submit", postSent);

function postSent(e) {
    let postInput = document.getElementById("postContent").value;
    if (postInput != "") {        
        let newPost = new Post(postInput);
        let display = new Display();
        display.add(newPost);
        display.clear();
    }

    e.preventDefault();
}

window.onload = () => {
    let str = document.cookie;
    str = str.replace("user=", "");
    str = str.replace(",", " ");
    let [userName, email] = str.split(" ");

    document.querySelector(".userName").innerHTML = userName;
    document.querySelector(".email").innerHTML = email;
}